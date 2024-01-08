FROM node:18
MAINTAINER Brian Broll <brian.broll@vanderbilt.edu>

ADD . /webgme-taxonomy
# If the following line fails, run `npm run prepare-docker` to remove test dependencies
ADD package-docker.json /webgme-taxonomy/package.json
WORKDIR /webgme-taxonomy
RUN npm i

CMD ["npm", "start"]
