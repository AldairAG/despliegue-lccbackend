FROM openjdk:19-jdk
ARG JAR_FILE=target/lccbackend-0.0.1.jar
COPY ${JAR_FILE} app_lccbackend.jar 
EXPOSE 8080
ENTRYPOINT ["java","-jar","app_lccbackend.jar"]





