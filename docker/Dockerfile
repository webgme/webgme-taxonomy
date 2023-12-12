FROM node:lts
MAINTAINER Brian Broll <brian.broll@vanderbilt.edu>

ADD . /webgme-taxonomy
# If the following line fails, run `npm run prepare-docker` to remove test dependencies
ADD package-docker.json /webgme-taxonomy/package.json
WORKDIR /webgme-taxonomy
RUN npm ci --legacy-peer-deps  # Needed until webgme dependency is updated to official release

CMD ["npm", "start"]
