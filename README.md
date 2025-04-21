# 🧩 Sistema de Gestión Full Stack: Despliegue en Render (Backend Spring Boot + PostgreSQL)

[![Estado del Despliegue](https://render-badge.onrender.com/static/svg/Hosted%20on%20Render.svg)](https://gestiondeclientes.onrender.com)

Esta rama (`render-deploy`) contiene la configuración del backend Spring Boot adaptada para el despliegue en la plataforma **Render.com**, utilizando una base de datos **PostgreSQL** gestionada por Render y **Docker** para la contenerización.

La aplicación backend gestiona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para Clientes, Empleados y Proveedores.

* **Repositorio Principal:** [https://github.com/Delnr91/GestionDeClientes](https://github.com/Delnr91/GestionDeClientes)
* **Rama Actual:** `render-deploy`
* **Aplicación Desplegada:** [https://gestiondeclientes.onrender.com](https://gestiondeclientes.onrender.com) *(¡Verifica que esta URL sea correcta después del despliegue!)*

---

## ✨ Diferencias Clave vs. Rama `main` (Enfocado en Backend para Render)

* **Base de Datos:** Configurado para usar **PostgreSQL** (compatible con el servicio gratuito de Render) en lugar de MySQL.
* **Empaquetado Backend:** El backend Spring Boot se empaqueta como un archivo **JAR** ejecutable.
* **Configuración de Conexión:** Adaptada para usar credenciales y URL de la base de datos de Render a través de variables de entorno y `application.properties`.
* **Despliegue:** Preparado para despliegue como **Web Service Dockerizado** en Render.com.

---

## 🛠️ Tecnologías Utilizadas (Backend y Despliegue)

* **Backend:**
    * Java 21 (Temurin)
    * Spring Boot 3.4.2
    * Spring Web (API REST)
    * Spring Data JPA (con Hibernate 6.6.5.Final)
    * Spring Boot Validation
    * PostgreSQL Driver JDBC
    * Lombok
    * Maven (Gestión de dependencias y build)
* **Base de Datos:**
    * PostgreSQL 16.8 (Servicio gestionado por Render - Free Tier)
* **Contenerización:**
    * Docker
* **Plataforma Cloud & Despliegue:**
    * Render.com (PaaS - Free Tier para Web Service y PostgreSQL)
    * Git & GitHub (Control de versiones y fuente para despliegue CI/CD básico)

---

## ☁️ Despliegue Detallado en Render.com

Esta guía describe los pasos seguidos para desplegar esta rama (`render-deploy`) en Render:

**1. Crear Base de Datos PostgreSQL en Render:**

* En el Dashboard de Render, ir a "New +" -> "PostgreSQL".
* Asignar un nombre (ej: `GestionClientes-postgres`).
* Seleccionar la **Región** deseada (ej: `Ohio (US East)`).
* Elegir el plan **"Free"**.
* Una vez creada (estado "Available"), ir a la sección **"Connections"** y anotar:
    * `Hostname` (el externo/público)
    * `Port` (ej: 5432)
    * `Database` (nombre de la base de datos, ej: `system_n7bg`)
    * `Username` (ej: `root`)
    * `Password`

**2. Preparar la Aplicación Spring Boot:**

* **`pom.xml`:** Verificar la inclusión de la dependencia `org.postgresql:postgresql` con scope `runtime`.
* **`application.properties` (`AppSpring/src/main/resources/`):** Configurar la conexión a la base de datos de Render:
    ```properties
    # URL JDBC construida manualmente con datos de Render
    spring.datasource.url=jdbc:postgresql://TU_HOSTNAME_RENDER:TU_PUERTO_RENDER/TU_DBNAME_RENDER

    # Credenciales leídas desde Variables de Entorno de Render
    spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
    spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

    # Driver Class explícito (necesario en nuestro caso)
    spring.datasource.driver-class-name=org.postgresql.Driver

    # Creación/Actualización automática del esquema por Hibernate
    spring.jpa.hibernate.ddl-auto=update

    # Otras propiedades...
    ```
    *(Reemplazar `TU_HOSTNAME_RENDER`, `TU_PUERTO_RENDER`, `TU_DBNAME_RENDER` con los valores reales anotados)*.
* **`Dockerfile` (`AppSpring/`):** Implementar un build **multi-etapa**:
    ```dockerfile
    # Etapa 1: Build con Maven y JDK 21
    FROM maven:3.9-eclipse-temurin-21 AS build
    WORKDIR /app
    COPY pom.xml .
    RUN mvn dependency:go-offline -B
    COPY src ./src
    RUN mvn package -DskipTests
    # (Se quitó el paso de debug 'jar -tf')

    # Etapa 2: Runtime con JRE 21 (No-Alpine)
    FROM eclipse-temurin:21-jre
    WORKDIR /app
    COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar demo.jar #<- Asegurar nombre del JAR
    EXPOSE 8080
    ENTRYPOINT ["java", "-jar", "demo.jar"]
    ```
    *(Se usó `eclipse-temurin:21-jre` en lugar de `jre-alpine` para resolver problemas de detección del driver)*.

**3. Crear Web Service en Render:**

* En Render, ir a "New +" -> "Web Service".
* Seleccionar "Build and deploy from a Git repository" y conectar con `Delnr91/GestionDeClientes`.
* Configurar:
    * **Name:** ej: `gestiondeclientes` (esto define la URL `.onrender.com`).
    * **Region:** Seleccionar la **misma región** que la base de datos.
    * **Branch:** `render-deploy` (o el nombre de esta rama).
    * **Root Directory:** `AppSpring` (¡Importante!).
    * **Runtime:** `Docker`.
    * **Plan:** "Free".
* **Environment Variables:** Añadir **SOLO** las siguientes (en la sección "Environment" o "Advanced"):
    * `SPRING_DATASOURCE_USERNAME`: Pegar el usuario de la BD Render.
    * `SPRING_DATASOURCE_PASSWORD`: Pegar la contraseña de la BD Render.
    * *(Opcional)* `SERVER_PORT`: `8080`.
    * *(Nota: Se eliminó `SPRING_DATASOURCE_URL` de las variables de Render para evitar conflictos)*.
* Clic en "Create Web Service".

**4. Proceso de Despliegue y Troubleshooting:**

* Render clona el repositorio, ejecuta el `Dockerfile` multi-etapa (compila y empaqueta).
* Se inicia el contenedor con la imagen resultante.
* **Troubleshooting Realizado:**
    * Se corrigió el `Root Directory` inicial.
    * Se iteró sobre la configuración de `application.properties` (`url` vs `jdbc-url`, driver explícito vs auto-detectado, uso de variables de entorno). La configuración final usa `url` con formato JDBC hardcoded y credenciales por variables.
    * Se cambió la imagen base JRE de `alpine` a estándar para resolver error `Failed to determine driver class`.
    * Se usó "Clear build cache & deploy" para asegurar la aplicación de cambios.
* **Verificación Final:** Se accedió a la URL `.onrender.com` y se verificó la respuesta de la API y la conexión a la base de datos (Hibernate creó las tablas vacías).

**5. Acceso:**

* La aplicación desplegada está disponible en: [https://gestiondeclientes.onrender.com](https://gestiondeclientes.onrender.com)

---

## 🚀 Ejecución Local (Configurada en la rama Main)

