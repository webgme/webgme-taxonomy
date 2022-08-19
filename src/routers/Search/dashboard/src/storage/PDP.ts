import testDataItems from "../TestResultData.js";
import fetch from 'node-fetch';

class PDP {
  token: string;

  constructor(token: string) {
    console.log('this might be good');
    this.token = token;
  }

  _getHeaders() {
    return {
      'Authorization': 'Bearer '+this.token,
      //'accept': 'application/json',
      //'Access-Control-Allow-Origin':'*',
      //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    };
  }

  async _getAllObservations(processId) {
      const response = await fetch(
        'https://leappremonitiondev.azurewebsites.net/v2/Process/GetProcessState?processId='+processId, {
        method: 'get',
        mode: 'no-cors', //TODO find a proper way, so far this appears to be the only thing that make the call at least reach the PDP
        headers: this._getHeaders()
      });
      const obsInfo = response.json();
      //TODO not sure how this environment can have promise
      const observations = [];
      for(let i=1;i<=obsInfo.numObservations; i+=1) {
        const subResponse = await fetch(
          'https://leappremonitiondev.azurewebsites.net/v2/Process/GetObservation?processId='+processId+'&obsIndex='+i, {
            method: 'get',
            mode: 'no-cors',
            headers: this._getHeaders()
          });
        observations.push(await subResponse.json());
      }
      return observations;
  }

  async listArtifacts() {
    const response = await fetch('https://leappremonitiondev.azurewebsites.net/v2/Process/ListProcesses?permission=read', {
      method: 'get',
      mode: 'no-cors',
      headers: this._getHeaders()
      });
    const data : object[] = (await response.json() || [{}]).filter(element => element.processType === 'data');
    let realDataItems = [];

    await Promise.all(data.map(async process => {
      const processObservations = await this._getAllObservations(process.processId);
      realDataItems = realDataItems.concat(processObservations);
    }));
    
    return realDataItems;
  }

  async downloadArtifact(metadata) {
    // TODO
  }

  async updateArtifact(metadata, newContent) {
    // TODO
  }

  async createArtifact(metadata, content) {
    // TODO
  }
}

export default PDP;
