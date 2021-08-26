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

RUN sudo dpkg --add-architecture i386
RUN sudo apt-get update
RUN sudo apt-get --force-yes install -y libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386
RUN node -v


ADD  . /app
WORKDIR /app

RUN sudo chown -R `whoami` /app/*
RUN sudo chown -R `whoami` /app/node_modules/*

RUN find . -name "node_modules" -exec rm -rf '{}' +
RUN ls && npm install


EXPOSE 2468

CMD [ "npm", "run", "start"]

