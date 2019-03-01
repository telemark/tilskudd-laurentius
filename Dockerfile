# Setting the base to nodejs 8.6.0
FROM node:8.15.1-alpine@sha256:32e73aad77719468ac82097642fde0f4747258a386f48e9bad25c91546d8e37d

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
