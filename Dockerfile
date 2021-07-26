FROM node:16.3.0-alpine

WORKDIR /home/app

COPY . ./

RUN yarn && yarn cache clean

EXPOSE 3000
EXPOSE 9229

CMD ["yarn", "start:dev"]
