FROM sitespeedio/node:ubuntu-22-04-nodejs-20.9.0
LABEL authors="zalubo"
LABEL team="Ghosts"


RUN apt-get update && apt-get install -y \
  openjdk-17-jdk \
  npm \
  nginx \
  findutils \
  curl

WORKDIR /server

COPY ./server/build.gradle /server/
COPY ./server/settings.gradle /server/
COPY ./server/gradlew /server/

COPY ./server/gradle /server/gradle
COPY ./server/src /server/src

RUN ./gradlew build

# Expose the application's port (adjust as needed)

WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY ./client/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./client/ .

WORKDIR /etc/nginx/conf.d
COPY ./nginx/default.conf .
COPY ./nginx/nginx.conf ./../

COPY ./start.sh /

RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]

