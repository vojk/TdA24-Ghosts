#!/bin/bash

# Start the React.js frontend
cd /client
#npm start &
npm install -g serve
serve -s build &

# Wait for the React.js application to be ready
while ! curl -s http://localhost:3000 >/dev/null; do
  sleep 1
done

# Start the Spring Boot backend
cd /server
java -jar /server/build/libs/tda-0.0.1-SNAPSHOT.jar &

# Wait for the Spring Boot application to be ready
while ! curl -s http://localhost:8080 >/dev/null; do
  sleep 1
done

# Start Nginx
nginx -g 'daemon off;'

