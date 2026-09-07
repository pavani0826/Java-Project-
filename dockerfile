#Stage1 of base image
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

COPY . .

RUN mvn package

#stage2 of base image

FROM eclipse-temurin:17-jre-alpine 

WORKDIR /app

COPY --from=builder /app/target/todo-0.0.1-SNAPSHOT.jar /app/todo.jar

CMD ["java","-jar", "todo.jar"]


