FROM node:lts
MAINTAINER Brian Broll <brian.broll@vanderbilt.edu>

ADD . /webgme-taxonomy
WORKDIR /webgme-taxonomy
RUN npm ci --legacy-peer-deps  # Needed until webgme dependency is updated to official release

CMD ["npm", "start"]
