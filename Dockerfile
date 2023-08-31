FROM node:lts
MAINTAINER Brian Broll <brian.broll@vanderbilt.edu>

ADD . /webgme-taxonomy
WORKDIR /webgme-taxonomy
# ensure the package has been built (check-docker) before running the build
RUN bash bin/check-docker && npm ci --omit dev --legacy-peer-deps  # Needed until webgme dependency is updated to official release

CMD ["npm", "start"]
