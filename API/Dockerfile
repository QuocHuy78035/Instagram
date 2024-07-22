FROM node:20-alpine

# # We use nodemon to restart the server every time there's a change
RUN npm install -g nodemon

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# Use script specified in package,json
ENTRYPOINT ["nodemon","--legacy-watch", "-x", "ts-node", "server.ts"]