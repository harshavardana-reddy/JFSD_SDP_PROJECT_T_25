# Use the official OpenJDK image as the base image
FROM openjdk:17

# Expose port 8080 for your Spring Boot application
EXPOSE 8080

# Copy the Spring Boot JAR file into the container
ADD target/SDPBACKENDSPRINGBOOT-0.0.1-SNAPSHOT.jar /SDPBACKENDSPRINGBOOT-0.0.1-SNAPSHOT.jar

# Set the entry point for the container
ENTRYPOINT ["java", "-jar", "/SDPBACKENDSPRINGBOOT-0.0.1-SNAPSHOT.jar"]
