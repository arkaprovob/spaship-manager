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
RUN apt-get install sudo

RUN apt-get install --yes curl
RUN apt update
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt-get  --force-yes install -y nodejs
RUN apt-get install --yes build-essential
RUN apt-get install --only-upgrade bash
RUN node -v

RUN mkdir app
RUN chown -Rh $user:$user /app
USER $user

ADD  . /app
WORKDIR /app

RUN find . -name "node_modules" -exec rm -rf '{}' +
 RUN sudo chmod -R 777 /app
RUN ls && npm install
 RUN sudo chmod -R 777 /app
RUN sudo npm install -g --unsafe-perm thePackage
#USER $user
ENV REACT_APP_API_URL=http://localhost:3000/api/v1

EXPOSE 2468

CMD [ "npm", "run", "start"]


#docker network create spaship
#docker run -p 3000:3000 -d --net spaship --name manager spa-manager
#docker run -p dev.foo.redhat.com:2468:2468 -d --net spaship --name manager spa-manager
#docker run -it -v mongodata:/data/db  -p 27017:27017 --name mongo -d --net spaship mongo
#db-con = mongo.spaship:27017