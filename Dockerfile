# Setting the base to nodejs 8.6.0
FROM node:8.14.1-alpine@sha256:dbe70ff383399ad9af341a44122700fece093ed4a2f794a88919caba59ba903e

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
