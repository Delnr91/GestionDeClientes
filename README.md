# 🧩 Sistema de Gestión Full Stack: React & Spring Boot

[![Repo GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/Delnr91/GestionDeClientes)
[![Estado del Proyecto](https://img.shields.io/badge/estado-demo_técnica-blueviolet)](https://github.com/Delnr91/GestionDeClientes)
[![Licencia](https://img.shields.io/badge/licencia-MIT-green)](LICENSE)

Aplicación **Full Stack profesional** desarrollada como **demo técnica de portafolio**. Demuestra habilidades en desarrollo web (React + Tailwind), backend (Java + Spring Boot), integración de API REST, bases de datos remotas (MariaDB en Google Cloud) y despliegue en la nube (Docker).

La aplicación gestiona operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) para **Clientes, Empleados y Proveedores**.

**Repositorio:** [https://github.com/Delnr91/GestionDeClientes](https://github.com/Delnr91/GestionDeClientes)

---

## ✨ Características Principales

* **Interfaz Moderna:** Frontend adaptable a escritorio y móvil implementado con React + Tailwind.
* **Backend Robusto:** API REST construida con Spring Boot y Java 21.
* **Gestión de Datos:** Operaciones CRUD completas para múltiples entidades.
* **Base de Datos Flexible:** Soporte para MySQL (local) y MariaDB (remota en Google Cloud).
* **Despliegue Profesional:** Backend dockerizado y desplegado en Google Cloud Platform.
* **Adaptación Móvil (Opcional):** Posibilidad de adaptar a móvil con Capacitor.
* **Pruebas Integradas:** Verificación local y remota con Postman.
* **Configuración Segura:** Manejo de CORS, variables de entorno y túneles SSH.

---

## 🛠️ Tecnologías Utilizadas

**Frontend**

| Tecnología     | Descripción                                |
| -------------- | ------------------------------------------ |
| React          | Biblioteca principal para la UI            |
| Tailwind CSS   | Framework CSS para estilos                 |
| Vite           | Entorno de desarrollo y empaquetador       |
| React Router v6| Sistema de navegación (Asumido/Necesario)  |
| Lucide React   | Biblioteca de Iconos                       |
| Capacitor      | Puente para desarrollo móvil nativo (Opcional) |
| Android Studio | IDE para pruebas y compilación Android (Opcional) |

**Backend**

| Tecnología          | Descripción                                   |
| ------------------- | --------------------------------------------- |
| Java 21 (Temurin)   | Lenguaje de programación                      |
| Spring Boot 3.x     | Framework principal para la API REST          |
| Spring Web          | Creación de endpoints RESTful                 |
| Spring Data JPA     | Acceso a datos y ORM (con Hibernate)          |
| Hibernate Validator | Validación de datos (Jakarta Bean Validation) |
| Maven               | Gestión de dependencias y construcción        |
| Docker              | Contenerización para despliegue              |

**Base de Datos**

| Tecnología      | Uso                                         |
| --------------- | ------------------------------------------- |
| MySQL (XAMPP)   | Base de datos para desarrollo local         |
| MariaDB (GCP)   | Base de datos remota en Google Cloud VM     |
| MySQL Workbench | Cliente gráfico para gestión de BD (local/remota vía SSH) |

**Despliegue y Otros**

| Tecnología           | Uso                                          |
| -------------------- | -------------------------------------------- |
| Google Cloud Platform| Hosting de VM Linux para BD y backend Docker |
| Postman              | Pruebas de API REST                          |
| Git & GitHub         | Control de versiones y repositorio           |

---

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### 📋 Prerrequisitos

* **Java JDK 21** o superior ([Temurin recomendado](https://adoptium.net/))
* **Maven** ([Incluido con Spring Boot o instalar por separado](https://maven.apache.org/))
* **Node.js y npm** ([Descargar aquí](https://nodejs.org/))
* **Git** ([Descargar aquí](https://git-scm.com/))
* **XAMPP** (o un servidor MySQL local similar) ([Descargar aquí](https://www.apachefriends.org/))
* **Docker** (Opcional, para probar el contenedor localmente) ([Descargar aquí](https://www.docker.com/))
* **Android Studio** (Opcional, si se quiere probar la adaptación móvil con Capacitor) ([Descargar aquí](https://developer.android.com/studio))

### ⚙️ Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Delnr91/GestionDeClientes.git](https://github.com/Delnr91/GestionDeClientes.git)
    cd GestionDeClientes
    ```

2.  **Configurar Base de Datos Local (MySQL con XAMPP):**
    * Inicia Apache y MySQL desde el panel de control de XAMPP.
    * Abre `http://localhost/phpmyadmin` en tu navegador.
    * Crea una nueva base de datos llamada `system`.
    * Importa el archivo `system.sql` (ubicado en la raíz del proyecto o en una carpeta designada) en la base de datos `system` recién creada.

3.  **Configurar Backend:**
    * Navega a la carpeta del backend (ej. `cd backend`).
    * Verifica/ajusta el archivo `src/main/resources/application.properties` para la conexión local:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/system
        spring.datasource.username=root # O tu usuario de MySQL
        spring.datasource.password= # O tu contraseña de MySQL
        # Asegúrate que el puerto 3306 es correcto para tu instalación de XAMPP/MySQL
        ```

4.  **Configurar Frontend (React + Tailwind):**
    * Navega a la carpeta del frontend (ej. `cd ../frontend`).
    * Instala las dependencias:
        ```bash
        npm install
        ```
    * Crea un archivo `.env` en la raíz del frontend con la URL del backend local:
        ```env
        # frontend/.env
        VITE_API_URL=http://localhost:8080/api/
        ```

### ▶️ Ejecución

1.  **Ejecutar Backend (desde la carpeta `backend`):**
    ```bash
    ./mvnw spring-boot:run
    # O si tienes Maven global: mvn spring-boot:run
    ```
    El backend estará disponible en `http://localhost:8080`.

2.  **Ejecutar Frontend (desde la carpeta `frontend`):**
    ```bash
    npm run dev
    ```
    La aplicación frontend estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

---

## ☁️ Despliegue (Ejemplo con Google Cloud y Docker)

Este proyecto incluye configuración para desplegar el backend en una VM de Google Cloud usando Docker y conectar una base de datos MariaDB remota.

### 📦 Backend (Docker)

1.  **Empaquetar como WAR (desde la carpeta `backend`):**
    ```bash
    ./mvnw clean package -DskipTests
    ```
    Esto genera `target/demo-0.0.1-SNAPSHOT.war`.

2.  **Construir Imagen Docker (desde la carpeta `backend`, donde está el `Dockerfile`):**
    ```dockerfile
    # backend/Dockerfile (Ejemplo)
    FROM openjdk:21-jdk-alpine
    MAINTAINER Daniel Núñez Rojas <danidev33@gmail.com>

    COPY target/demo-0.0.1-SNAPSHOT.war app.war

    # Expone el puerto que usa Spring Boot (por defecto 8080)
    EXPOSE 8080

    ENTRYPOINT ["java", "-jar", "/app.war"]
    ```bash
    docker build -t tu_imagen_backend .
    ```

3.  **Subir y Ejecutar en Google Cloud VM:**
    * Transfiere la imagen Docker a la VM (o constrúyela allí).
    * Asegúrate que la VM tiene Docker instalado y el puerto `8080` abierto en el firewall de GCP.
    * Configura el `application.properties` dentro del contenedor (o mediante variables de entorno de Docker) para apuntar a la IP de la VM de MariaDB:
        ```properties
        spring.datasource.url=jdbc:mysql://<IP_VM_MARIADB>:3306/system
        spring.datasource.username=springuser # Usuario remoto creado en MariaDB
        spring.datasource.password=yourpassword # Contraseña del usuario remoto
        ```
    * Ejecuta el contenedor en la VM:
        ```bash
        docker run -d -p 8080:8080 --name backend_app tu_imagen_backend
        ```

### 🌐 Frontend

1.  **Construir para Producción (desde la carpeta `frontend`):**
    * Crea/Asegúrate que el archivo `.env.production` (si existe) tiene la URL correcta de la API desplegada (ej. `VITE_API_URL=http://<IP_EXTERNA_VM_BACKEND>:8080/api/`).
    * Ejecuta:
        ```bash
        npm run build
        ```
    * Esto genera los archivos estáticos en la carpeta `dist/`.

2.  **Desplegar Archivos Estáticos:**
    * Sube el contenido de la carpeta `dist/` a un servicio de hosting estático (como Firebase Hosting, Netlify, Vercel, Google Cloud Storage, o incluso un servidor web como Nginx en la misma VM del backend).

### 🗄️ Base de Datos Remota (MariaDB en Google Cloud VM)

* Crea una VM en Google Cloud (Debian/Ubuntu recomendado).
* Instala `mariadb-server`.
* Configura `mariadb` para aceptar conexiones remotas (editando `50-server.cnf` y cambiando `bind-address` a `0.0.0.0`).
* Crea un usuario específico para la aplicación (`springuser`) con permisos adecuados desde cualquier host (`%`).
* Abre el puerto `3306` en el firewall de GCP (¡Considera restringir la IP de origen por seguridad!).
* Conéctate remotamente usando MySQL Workbench (preferiblemente vía túnel SSH para mayor seguridad).
* Importa la estructura de la base de datos (`system.sql`) en MariaDB.

---

## 📱 Ejecución en Android (Opcional con Capacitor)

Si deseas adaptar la versión React + Tailwind a móvil usando Capacitor:

1.  **Instalar Capacitor (desde la carpeta `frontend`):**
    ```bash
    npm install @capacitor/core @capacitor/cli
    npm install @capacitor/android
    ```
2.  **Inicializar Capacitor (si es la primera vez):**
    ```bash
    npx cap init [NombreApp] [com.tuempresa.app]
    ```
3.  **Añadir Plataforma Android:**
    ```bash
    npx cap add android
    ```
4.  **Construir el Frontend:**
    ```bash
    npm run build
    ```
5.  **Sincronizar Cambios:**
    ```bash
    npx cap sync android
    ```
    * **¡Importante!** Para que el emulador se conecte al backend local (`localhost:8080`), necesitas usar la IP especial `10.0.2.2`. Ajusta `VITE_API_URL` en tu `.env` (o `.env.development`) a `http://10.0.2.2:8080/api/` antes de hacer `npx cap sync`.
6.  **Abrir en Android Studio:**
    ```bash
    npx cap open android
    ```
7.  **Ejecutar:**
    * Dentro de Android Studio, selecciona un emulador o dispositivo físico y ejecuta la aplicación.

---

## 🗺️ Rutas Principales de la API (Backend)

El backend expone los siguientes endpoints bajo el prefijo `/api`:

| Método | Ruta                  | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| `GET`  | `/customers`          | Obtener todos los clientes       |
| `GET`  | `/customers/{id}`     | Obtener un cliente por ID        |
| `POST` | `/customers`          | Crear o Actualizar un cliente    |
| `DELETE`| `/customers/{id}`     | Eliminar un cliente por ID       |
| `GET`  | `/employees`          | Obtener todos los empleados      |
| `GET`  | `/employees/{id}`     | Obtener un empleado por ID       |
| `POST` | `/employees`          | Crear o Actualizar un empleado   |
| `DELETE`| `/employees/{id}`     | Eliminar un empleado por ID      |
| `GET`  | `/suppliers`          | Obtener todos los proveedores    |
| `GET`  | `/suppliers/{id}`     | Obtener un proveedor por ID      |
| `POST` | `/suppliers`          | Crear o Actualizar un proveedor  |
| `DELETE`| `/suppliers/{id}`     | Eliminar un proveedor por ID     |

*(Consulta `CustomerController.java`, `EmployeeController.java`, `SupplierController.java` para detalles)*

---

## ⚠️ Advertencias y Errores Comunes

* **Error CORS:** Si el frontend no puede conectar con el backend, verifica que:
    * El backend se está ejecutando.
    * La configuración CORS en `CorsConfig.java` (backend) permite el origen del frontend (`http://localhost:5173` para desarrollo local, o el dominio de producción).
    * La `VITE_API_URL` en el archivo `.env` (o `.env.production`) del frontend es correcta.
* **Conexión a Base de Datos:** Asegúrate que los datos de conexión (URL, usuario, contraseña) en `application.properties` (backend) son correctos para tu entorno (local o remoto). Verifica que el servidor de base de datos está activo y accesible.
* **Android Emulator y `localhost`:** Recuerda usar `http://10.0.2.2:8080/api/` como `VITE_API_URL` cuando ejecutes el frontend desde el emulador de Android para conectar al backend que corre en tu máquina host.
* **Permisos de Firewall (GCP):** Si despliegas en Google Cloud, asegúrate de que los puertos necesarios (`8080` para el backend, `3306` para MariaDB, `22` para SSH) están abiertos en las reglas de firewall de la VM.
* **Warning `import.meta`:** Si ves un warning sobre `import.meta` no disponible en `es2015`, revisa la configuración `target` en `vite.config.js` y/o `tsconfig.json` para asegurarte de que sea moderna (ej. `esnext`).

---

## 🤝 Cómo Contribuir

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, sigue estos pasos:

1.  **Haz un Fork** del repositorio: [https://github.com/Delnr91/GestionDeClientes](https://github.com/Delnr91/GestionDeClientes)
2.  **Crea una nueva Rama** para tu funcionalidad o corrección: `git checkout -b feature/nueva-funcionalidad` o `git checkout -b fix/correccion-bug`.
3.  **Realiza tus Cambios** y haz commits descriptivos.
4.  **Asegúrate** de que el código sigue las guías de estilo del proyecto (si existen) y que las pruebas (si existen) pasan.
5.  **Haz Push** a tu rama: `git push origin feature/nueva-funcionalidad`.
6.  **Abre un Pull Request** en el repositorio original, describiendo claramente tus cambios.

---

## 👨‍💻 Autor

* **Nombre:** Daniel Núñez Rojas
* **GitHub:** [@Delnr91](https://github.com/Delnr91)
* **LinkedIn:** [Daniel Núñez Rojas](https://www.linkedin.com/in/delnr91)
* **Correo:** [danidev33@gmail.com](mailto:danidev33@gmail.com)

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

```text
MIT License

Copyright (c) 2025 Daniel Núñez Rojas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR
