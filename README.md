# 🧩 Sistema de Gestión Full Stack: React & Spring Boot (Rama Render/PostgreSQL)

[![Repo GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/Delnr91/GestionDeClientes) [![Rama Actual](https://img.shields.io/badge/rama-render--deploy-lightgrey)](https://github.com/Delnr91/GestionDeClientes/tree/render-deploy) [![Estado del Proyecto](https://img.shields.io/badge/estado-demo_para_Render-blueviolet)](ENLACE_A_TU_APP_EN_RENDER) [![Licencia](https://img.shields.io/badge/licencia-MIT-green)](LICENSE)

**Esta rama (`render-deploy`) contiene una versión modificada de la aplicación Full Stack original, adaptada específicamente para el despliegue en la plataforma Render usando una base de datos PostgreSQL.**

La aplicación gestiona operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) para **Clientes, Empleados y Proveedores** usando React para el frontend y Spring Boot para el backend.

**Repositorio (Rama Principal):** [https://github.com/Delnr91/GestionDeClientes](https://github.com/Delnr91/GestionDeClientes)
**Rama Actual:** `render-deploy` 

---

## ✨ Diferencias Clave vs. Rama `main`

* **Base de Datos:** Configurada para usar **PostgreSQL** (compatible con el servicio gratuito de Render) en lugar de MySQL/MariaDB.
* **Empaquetado Backend:** El backend Spring Boot se empaqueta como un archivo **JAR** ejecutable (en lugar de WAR), optimizado para `java -jar`.
* **Configuración Frontend:** Las llamadas a la API desde React usan **rutas relativas** (`/api/...`) en lugar de una URL absoluta (`VITE_API_URL`), ya que el frontend es servido por el mismo backend Spring Boot.
* **Despliegue:** Preparado para despliegue como **Web Service Dockerizado** en **Render.com**, conectándose a una base de datos PostgreSQL gestionada por Render.

---

## 🛠️ Tecnologías Utilizadas (Ajustadas para esta Rama)

**Frontend**

| Tecnología     | Descripción                              |
| -------------- | ---------------------------------------- |
| React          | Biblioteca principal para la UI          |
| Ionic React    | Componentes UI y utilidades móviles      |
| Vite           | Entorno de desarrollo y empaquetador     |
| React Router v5| Sistema de navegación                    |
| ionicons       | Iconos de Ionic                          |
| CSS (Custom)   | Estilos personalizados (`variables.css`) |

**Backend**

| Tecnología          | Descripción                             |
| ------------------- | --------------------------------------- |
| Java 21 (Temurin)   | Lenguaje de programación                |
| Spring Boot 3.x     | Framework principal para la API REST    |
| Spring Web          | Creación de endpoints RESTful           |
| Spring Data JPA     | Acceso a datos y ORM (con Hibernate)    |
| Hibernate Validator | Validación de datos                     |
| **PostgreSQL Driver**| Conector JDBC para PostgreSQL           |
| Maven               | Gestión de dependencias y construcción  |
| Docker              | Contenerización para despliegue en Render |

**Base de Datos (Render)**

| Tecnología       | Uso                                   |
| ---------------- | ------------------------------------- |
| **PostgreSQL** | Base de datos gestionada en Render (Free Tier) |

**Despliegue (Render)**

| Tecnología     | Uso                                                        |
| -------------- | ---------------------------------------------------------- |
| **Render.com** | Plataforma PaaS para Web Service (Docker) y Base de Datos |
| Git & GitHub   | Control de versiones y fuente para despliegue en Render    |



---

## ☁️ Despliegue en Render.com (Guía Rápida)

Esta rama está diseñada para desplegarse fácilmente en Render:

1.  **Crear Base de Datos PostgreSQL:**
    * En Render, crea un nuevo servicio de tipo "PostgreSQL".
    * Elige el plan "Free".
    * Copia los datos de conexión (Internal Connection URL, User, Password).
2.  **Crear Web Service:**
    * En Render, crea un nuevo servicio de tipo "Web Service".
    * Conecta tu repositorio Git y **selecciona la rama `render-deploy`** (o como la hayas llamado).
    * Configura el entorno como **"Docker"**. Render debería detectar tu `Dockerfile`.
    * Elige el plan "Free".
3.  **Configurar Variables de Entorno:**
    * En la configuración del Web Service, añade las siguientes variables de entorno:
        * `SPRING_DATASOURCE_URL`: Pega la "Internal Connection URL" de tu base de datos PostgreSQL de Render.
        * `SPRING_DATASOURCE_USERNAME`: Pega el usuario de la base de datos.
        * `SPRING_DATASOURCE_PASSWORD`: Pega la contraseña de la base de datos.
        * (Opcional) `JAVA_TOOL_OPTIONS`: Puedes usarla para ajustar memoria, ej: `-Xmx512m -Xss256k` (Render Free tiene RAM limitada).
4.  **Desplegar:**
    * Crea el servicio. Render clonará la rama, construirá la imagen Docker (si no está pre-construida) y desplegará tu aplicación.
    * La primera vez, Hibernate (`ddl-auto=update`) debería crear las tablas en la base de datos PostgreSQL.
5.  **Acceder:** Usa la URL `.onrender.com` proporcionada por Render para acceder a tu aplicación desplegada.


---

