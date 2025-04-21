# Usa Java 21 oficial con JDK completo
FROM eclipse-temurin:21-jdk-alpine

# Información del mantenedor (opcional)
LABEL maintainer="tuproyecto@example.com"

# Establece un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el WAR generado en el contenedor
COPY target/demo-0.0.1-SNAPSHOT.jar demo.jar

# Expone el puerto estándar de Spring Boot
EXPOSE 8080

# Comando para ejecutar el WAR
ENTRYPOINT ["java", "-jar", "app.jar"]
