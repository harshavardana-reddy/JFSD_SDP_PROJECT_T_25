# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and source code into the container
COPY pom.xml /app
COPY src /app/src

# Run Maven to build the project (including JAR generation)
RUN mvn clean package -DskipTests

# Package stage
FROM openjdk:17-slim

# Set the working directory for the application in the final image
WORKDIR /app

# Copy the JAR file from the build stage into the final image
COPY --from=build /app/target/SDPBACKENDSPRINGBOOT-0.0.1-SNAPSHOT.jar /app/SDPBACKENDSPRINGBOOT-0.0.1-SNAPSHOT.jar

# Expose port 8080
EXPOSE 8080

# Set the entry point to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/SDPBACKENDSPRINGBOOT-0.0.1-SNAPSHOT.jar"]
