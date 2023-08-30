FROM node:lts
MAINTAINER Brian Broll <brian.broll@vanderbilt.edu>

ADD . /webgme-taxonomy
WORKDIR /webgme-taxonomy
# An ugly hack to remove playwright (breaking the docker build). We don't have a way to differentiate
# between build and test dependencies...
RUN cat package.json | grep -v playwright > p2.json && \
  mv p2.json package.json
RUN npm i --legacy-peer-deps  # Needed until webgme dependency is updated to official release

CMD ["npm", "start"]
