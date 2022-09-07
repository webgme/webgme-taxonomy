const pdpBase = "https://leappremonitiondev.azurewebsites.net/";
const fetch = require("node-fetch");
const _ = require("underscore");
const fs = require('fs');
const https = require('https');
const RouterUtils = require("../../common/routers/Utils");

class PDP {
  constructor(token) {
    this.token = token;
  }

  async listArtifacts(type) {
    const allProcesses = await this._fetch(
      "v2/Process/ListProcesses?permission=read"
    );
    const processList = allProcesses.filter(
      (element) => element.processType === type
    );

    const processObservations = await Promise.all(
      processList.map(
        async (process) => await this.getLatestObservation(process.processId)
      )
    );

    return processObservations.flat();
  }

  async getDownloadUrls(processId, obsIndex, version) {
    const queryDict = _.mapObject(
      {
        processId,
        obsIndex,
        version,
        endObsIndex: obsIndex,
      },
      encodeURIComponent
    );
    const queryString = Object.entries(queryDict)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `v3/Files/GetObservationFiles?${queryString}`;
    const opts = {
      method: "PUT",
    };
    const result = await this._fetch(url, opts);
    await sleep(5000); // FIXME: check for it to be ready. Not very pretty currently...
    return result.files.map((file) => file.sasUrl);
  }

  async getLatestObservation(pid) {
    const obsInfo = await this._fetch(
      `v2/Process/GetProcessState?processId=${pid}`
    );

    const observations = await this._fetch(
      "v2/Process/GetObservation?processId=" +
        pid +
        "&obsIndex=" +
        (obsInfo.numObservations - 1)
    );

    return observations;
  }

  async getProcessObservations(pid) {
    const obsInfo = await this._fetch(
      `v2/Process/GetProcessState?processId=${pid}`
    );

    const observations = await Promise.all(
      range(1, obsInfo.numObservations).map((i) =>
        this._fetch(
          "v2/Process/GetObservation?processId=" + pid + "&obsIndex=" + i
        )
      )
    );

    return observations;
  }

  async createArtifact(type, metadata) {
    const newProc = await this._createProcess(type);
    // console.log(newProc);
    await this._appendObservation(newProc.processId, type, metadata);
    return newProc;
    // TODO: upload the data file
  }

  async getDownloadPath(processId, obsIndex, version) {
    const deferred = Q.defer();
    let downloadDir = null;
    let downloadName = null;

    _getObsFiles(processId, obsIndex, this.token)
    .then(response => {
        // console.log(response);
        //download all files into files of their places...
        downloadName = _prepareDownloadDir();
        downloadDir = './OUTPUT/' + downloadName;
        const promises = [];
        response.files.forEach(file => {
            promises.push(_getFile(_correctFilePath(downloadDir,file.name, index), file.sasUrl));
        });
        return Q.all(promises);
    })
    .then(results => {
        return zip(downloadDir, './OUTPUT/' + downloadName + '.zip', {compression:COMPRESSION_LEVEL.medium});
    })
    .then(() => {
        fs.rmdirSync(downloadDir,{recursive:true});
        deferred.resolve('./OUTPUT/' + downloadName + '.zip');
    })
    .catch(deferred.reject);

    return deferred.promise;
  }
  
  async getUploadUrls(type, processId, index, version, metadata, files) {
    return await this._appendObservationWithFiles(
      processId,
      index,
      version,
      type,
      metadata,
      files
    );
  }

  async _getObsFiles (pid, index, token) {
    const deferred = Q.defer();
    let response = '';
    const req = https.request({
        host:'leappremonitiondev.azurewebsites.net',
        path:'/v3/Files/GetObservationFiles?processId=' + pid + 
        '&obsIndex=' + index + '&expiresInMins=10&endObsIndex=' + index +
        '&filePattern=%2A%2A%2F%2A.%2A',
        headers: {
            Authorization: 'Bearer ' + token
        },
        method: 'PUT'
    }, res => {
        if(res.statusCode !== 200) {
            console.log(res.statusCode);
            return deferred.reject(new Error('failed to fetch transfer url\'s'));
        }

        res.on('data', d => {
            response += new Buffer.from(d).toString();
        });

        res.on('end', () => {
            try {
                // console.log(response);
                return deferred.resolve(JSON.parse(response));
            } catch (e) {
                return deferred.reject(e);
            }
        });
    });

    req.on('error', error => {
        // console.error(error);
        return deferred.reject(error);
    });

    req.end();

    return deferred.promise;
  }

  static _getFile (path, url) {
    console.log('GF:',path,url);
    const deferred = Q.defer();
    const pathArray = path.split('/');
    for(let i=1;i<pathArray.length-1;i+=1) {
        let inpath = '';
        for(let j=0;j<=i;j+=1) {
            inpath += pathArray[j] + '/';
        }
        inpath = inpath.slice(0, -1);
        if (!fs.existsSync(inpath)) {
            console.log('letsDIR:', inpath);
            fs.mkdirSync(inpath);
        }
    }
    const writeStream = fs.createWriteStream(path);
    https.get(url, response => {
        response.pipe(writeStream);
        writeStream.on('finish', () => {
            writeStream.close();
            deferred.resolve(path);
        });
    });

    return deferred.promise;
  };

  static _prepareDownloadDir () {
    console.log(__dirname);
    const length = 16;
    let downloadDir = '';
    let downloadName = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1 ) {
        downloadName += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    downloadDir = './OUTPUT/' + downloadName;
    const err = fs.mkdirSync(downloadDir);
    if (err) {
        throw new Error('canot reserve local directory for transfering data');
    }

    return downloadName;
  }

  static _correctFilePath (downloadDir, filename, index) {
    const result = downloadDir + filename.replace('dat/'+index, '');
    console.log(downloadDir,filename);
    console.log(result);
    return result;
  };

  async _appendObservation(processId, type, data) {
    const observation = {
      isFunction: false,
      processType: type,
      processId,
      observerId: RouterUtils.getObserverIdFromToken(this.token),
      isMeasure: false,
      index: 0,
      version: 0,
      applicationDependencies: [],
      processDependencies: [],
      data: [data],
      dataFiles: [],
    };

    const response = await this._fetch(
      `v3/Process/AppendObservation?processId=${processId}`,
      {
        method: "post",
        body: observation,
      }
    );
  }

  async _appendObservationWithFiles(
    processId,
    index,
    version,
    type,
    data,
    files
  ) {
    const observation = {
      isFunction: false,
      processType: type,
      processId,
      observerId: RouterUtils.getObserverIdFromToken(this.token),
      isMeasure: true,
      index,
      version,
      data: [data],
      dataFiles: files,
    };

    console.log('uploading?');
    return await this._fetch(
      `v3/Process/AppendObservation?processId=${processId}&uploadExpiresInMins=180`,
      {
        method: "post",
        headers: {
          "Content-Type":'application/json-patch+json'
        },
        body: observation,
      }
    );
  }

  async _createProcess(type) {
    //TODO we probably need description field
    const queryDict = {
      isFunction: false,
      isVirtual: false,
      processType: encodeURIComponent(type),
      processDescription: encodeURIComponent(
        "A process created from webgme-taxonomy"
      ),
    };
    const queryString = Object.entries(queryDict)
      .map((part) => part.join("="))
      .join("&");
    const url = `v2/Process/CreateProcess?${queryString}`;
    return await this._fetch(url, { method: "put" });
  }

  async _fetch(url, opts = {}) {
    url = pdpBase + url;
    opts.headers = opts.headers || {};
    opts.headers.Authorization = "Bearer " + this.token;
    opts.headers.accept = opts.headers.accept || "application/json";
    const response = await fetch(url, opts);
    // TODO: Check response status code
    return await response.json();
  }

  static from(req, gmeConfig) {
    //const token = require("./token");
    const token =
      req.cookies[gmeConfig.authentication.azureActiveDirectory.cookieId];
    return new PDP(token);
  }
}

async function sleep(duration) {
  return new Promise((res) => setTimeout(res, duration));
}

function range(start, end) {
  const len = end - start;
  return [...new Array(len)].map((v, index) => start + index);
}

module.exports = PDP;
