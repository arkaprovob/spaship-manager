#!/bin/bash

#
# Ubuntu Node.js Dockerfile for SPAShip
#
# https://github.com/dockerfile/ubuntu/blob/master/Dockerfile
# https://docs.docker.com/examples/nodejs_web_app/
#

# Pull base image.
FROM ubuntu:20.04

# Install Node.js
RUN apt-get update
RUN apt-get --force-yes upgrade  -y
RUN apt-get dist-upgrade
RUN apt-get  install -y build-essential
RUN  apt-get install sudo

RUN apt-get install --yes curl
RUN apt update
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt-get  --force-yes install -y nodejs
RUN apt-get install --yes build-essential
RUN apt-get install --only-upgrade bash

# Node Git Dependencies 

#RUN apt  --force-yes install -y libpcre
#RUN apt  --force-yes install -y libssl-dev
# RUN apt  --force-yes install -y pcre-config
#RUN apt-get --force-yes install -y  libpcre3 libpcre3-dev
#RUN apt-get install libssl-dev
#RUN apt --force-yes install -y krb5-config
#RUN  apt --force-yes install  -y libgit2-dev



#RUN curl https://launchpad.net/ubuntu/+source/apt/1.6.11/+build/16829590/+files/apt_1.6.11_amd64.deb
#RUN sudo dpkg -i apt_1.6.11_amd64.deb 
RUN sudo dpkg --add-architecture i386
RUN sudo apt-get update
RUN sudo apt-get --force-yes install -y libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386
RUN node -v

ADD  . /app
WORKDIR /app

RUN find . -name "node_modules" -exec rm -rf '{}' +
RUN ls && npm install
#RUN ls && npm i -g @patternfly/react-core
#RUN ls && npm i -g @patternfly/react-icons
#RUN ls && npm i -g @patternfly/react-styles
#RUN ls && npm i -g @patternfly/react-table
#RUN npm run testl
# RUN npm uninstall node-pre-gyp --save
# RUN npm install @mapbox/node-pre-gyp --save
#RUN npm i nodegit
# RUN npm install bcrypt

# RUN cd packages/manager-ui
# RUN npm i

#RUN apk add --update bash && rm -rf /var/cache/apk/*
# RUN apt-get --update bash 
ENV REACT_APP_API_URL=http://localhost:3000/api/v1

EXPOSE 2468

CMD [ "npm", "run", "start"]


#docker network create spaship
#docker run -p 3000:3000 -d --net spaship --name manager spa-manager
#docker run -p dev.foo.redhat.com:2468:2468 -d --net spaship --name manager spa-manager
#docker run -it -v mongodata:/data/db  -p 27017:27017 --name mongo -d --net spaship mongo
#db-con = mongo.spaship:27017