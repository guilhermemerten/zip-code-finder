FROM node:10-alpine3.11

EXPOSE 8081

RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN rm /app/ormconfig.json
RUN mv /app/ormconfig_docker.json /app/ormconfig.json 
RUN npm install --production
RUN npm run build

CMD ["npm", "start"]