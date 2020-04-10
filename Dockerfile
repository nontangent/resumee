# Install Node Modules Stage
FROM node:12.4.0-alpine AS base
VOLUME /var/node_modules

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

RUN mkdir /root/app
WORKDIR /root/app
COPY ./app/package.json /root/app/package.json

RUN npm install
RUN npm install -g @angular/cli@9.1.1

# Set Up Node App
FROM base

ARG COMMAND=build
ENV COMMAND ${COMMAND}

COPY ./app /root/app

# Cache of npm
COPY ./scripts /root/app/scripts
RUN /root/app/scripts/entry $COMMAND

ENTRYPOINT ["./scripts/entry"]
CMD ["npm", "start"]
# CMD $COMMAND
