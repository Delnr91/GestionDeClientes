# --- Etapa 1: Construcción (Build Stage) ---
# Usa una imagen de Maven con JDK 21 (compatible con tu proyecto)
FROM maven:3.9-eclipse-temurin-21 AS build

# Establece el directorio de trabajo para la construcción
WORKDIR /app

# Copia solo el pom.xml para descargar dependencias (aprovecha caché de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia el resto del código fuente de tu backend
COPY src ./src

# Ejecuta el build de Maven para compilar y empaquetar el JAR, saltando tests
# Esto creará el JAR dentro de /app/target/
RUN mvn package -DskipTests

# --- Etapa 2: Ejecución (Runtime Stage) ---
# Usa una imagen ligera solo con JRE 21 Alpine (más pequeña)
FROM eclipse-temurin:21-jre-alpine

# Establece el directorio de trabajo para la ejecución
WORKDIR /app

# Copia ÚNICAMENTE el JAR construido desde la etapa 'build'
# ¡¡¡IMPORTANTE!!! Asegúrate que 'demo-0.0.1-SNAPSHOT.jar' es el nombre correcto
# generado por tu build de Maven en la carpeta 'target'.
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar demo.jar

# Expone el puerto de la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación (no necesita ENV PORT aquí, usa el default 8080)
# NUEVO ENTRYPOINT CON DEBUG:
# Imprime el contenido del application.properties DENTRO DEL JAR y luego ejecuta
# NOTA: La ruta '/app/BOOT-INF/classes/application.properties' es común, pero si
#       el comando 'cat' falla o no muestra nada, podríamos necesitar ajustarla.
ENTRYPOINT ["sh", "-c", "echo '--- Contents of application.properties inside JAR: ---' && cat /app/BOOT-INF/classes/application.properties && echo '--- Starting application ---' && java -jar demo.jar"]

