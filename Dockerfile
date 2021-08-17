FROM node:14-alpine
LABEL Name=spaship-manager \
  Version=0.1.0 \
  maintainer="Soumyadip Chowdhury"
  
ADD  . /app

WORKDIR /app

RUN apk --no-cache add make python curl-dev g++

RUN apk --no-cache add gcc libc-dev libressl-dev

RUN ln -s /usr/lib/libcurl.so.4 /usr/lib/libcurl-gnutls.so.4

RUN apk add --update bash
 
RUN npm install

EXPOSE 2468

CMD [ "npm", "run", "start"]