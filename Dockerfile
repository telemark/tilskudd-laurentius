# Setting the base to nodejs 8.6.0
FROM node:8.16.0-alpine@sha256:ba9f924da87cb9a1c6f30879f4e4cd76aef43c4db28c441585a1115a5121b605

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update git && rm -rf /var/cache/apk/*

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT node example.js
