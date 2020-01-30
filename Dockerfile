FROM node:latest

WORKDIR /code

ENV PATH /code/node_modules/.bin:${PATH}

ADD . /code

RUN npm install

CMD ["npm", "start"]