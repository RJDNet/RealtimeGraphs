FROM node:14-alpine

WORKDIR /app

ADD . /app

RUN yarn add
RUN yarn add react-scripts@3.4.1 -g

#EXPOSE 5000

CMD [ "npm", "start" ]