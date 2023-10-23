FROM openjdk:11-jdk-slim

WORKDIR /app

COPY build/libs/*SNAPSHOT.jar app.jar

CMD ["java", "-jar", "app.jar"]