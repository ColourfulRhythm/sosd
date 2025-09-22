FROM node:16 as prod

RUN mkdir adpromoter

WORKDIR /adpromoter

COPY . /adpromoter/

COPY ./package.json ./package-lock.json /adpromoter/

RUN rm -rf dist

RUN npm install

RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV=prod


COPY . .

EXPOSE 80

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]


