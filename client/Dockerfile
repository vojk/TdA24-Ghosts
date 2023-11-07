FROM node:alpine

# Set the working directory in the container
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5000 for the application
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
