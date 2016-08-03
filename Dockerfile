FROM node:4-onbuild

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install --global gulp-cli

COPY /app /usr/src/app
COPY /capi-mock /usr/src/app

EXPOSE 8000
EXPOSE 9000

CMD [ "gulp", "docker" ]
