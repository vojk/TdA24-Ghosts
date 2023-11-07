# Use the official OpenJDK 17 as the base image
FROM openjdk:17-oracle

# Set the working directory inside the container
WORKDIR /server

# Copy the Gradle build files to the container
COPY build.gradle settings.gradle gradlew /server/
COPY gradle /server/gradle
COPY src /server/src

RUN microdnf install findutils

# Run the Gradle wrapper to download dependencies and build the application
RUN ./gradlew build

# Expose the application's port (adjust as needed)
EXPOSE 8080

# Specify the command to run your Spring Boot application
CMD ["java", "-jar", "build/libs/tda-0.0.1-SNAPSHOT.jar"]
