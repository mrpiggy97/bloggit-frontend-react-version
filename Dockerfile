FROM node:latest

WORKDIR /code

ENV PATH /code/node_modules/.bin:${PATH}
ENV REACT_APP_BLOGGIT_API_URL=http://localhost:8000
ENV REACT_APP_MODE=production

ADD . /code

RUN npm install
RUN npm run build

CMD [ "node",  "app.js" ]
