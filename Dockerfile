FROM sitespeedio/node:ubuntu-22-04-nodejs-20.9.0
LABEL authors="zalubo"

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
# EXPOSE 8080

# Specify the command to run your Spring Boot application

WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY ./client/package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./client/ .

# Expose port 5000 for the application
# EXPOSE 3000

WORKDIR /etc/nginx/conf.d
COPY ./nginx/default.conf .
COPY ./nginx/nginx.conf ./../

COPY ./start.sh /

RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]

