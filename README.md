# 🧩 Sistema de Gestión Full Stack con React, Ionic y Spring Boot — Despliegue Cloud y Mobile

Este proyecto es una aplicación **Full Stack profesional** desarrollada como parte de una **demo técnica de portafolio** para demostrar habilidades en desarrollo web, backend Java, integración de APIs REST, bases de datos remotas, despliegue en la nube y adaptación móvil.

La aplicación permite realizar operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) sobre **Clientes, Empleados y Proveedores**, usando una arquitectura moderna que combina:

- 🔹 **Frontend**: React + Ionic (UI adaptable a escritorio y móvil)
- 🔹 **Backend**: Spring Boot (Java 21) + JPA + MySQL/MariaDB
- 🔹 **Base de datos local**: MySQL (XAMPP)
- 🔹 **Base de datos remota**: MariaDB en instancia VM de Google Cloud (Linux)
- 🔹 **Dockerización y despliegue remoto**: Backend empaquetado como WAR y ejecutado vía Docker en la nube
- 🔹 **Android Studio**: Adaptación y ejecución de la app en entorno móvil real mediante emulador

El proyecto incluye:

✅ Pruebas locales y remotas con Postman  
✅ Comunicación entre frontend y backend mediante API REST  
✅ Configuración de CORS, variables de entorno, túneles SSH y acceso seguro  
✅ Visualización móvil adaptada y funcionamiento en Android Studio  
✅ Conexión cloud usando Google Cloud Platform y configuración de puertos/firewall

> 🎯 Este proyecto está diseñado no solo para ser funcional, sino también para demostrar un dominio **completo del ciclo de desarrollo, integración, pruebas y despliegue profesional**.


## 🔧 Backend — API REST con Java 21 y Spring Boot

El backend del proyecto está desarrollado con **Spring Boot 3.4.2**, utilizando **Java 21**, y expone una API REST completa para la gestión de entidades como **Clientes, Empleados y Proveedores**.

### 🧱 Tecnologías usadas

| Tecnología          | Uso principal                                  |
|---------------------|-----------------------------------------------|
| Java 21             | Lenguaje principal (OpenJDK Temurin)          |
| Spring Boot         | Framework backend principal                   |
| Spring Web          | Crear y exponer endpoints REST                |
| Spring Data JPA     | Acceso a base de datos y ORM con Hibernate    |
| Hibernate Validator | Validación de datos con Jakarta Bean Validation |
| MySQL / MariaDB     | Motor de base de datos local/remoto           |
| Maven               | Gestión de dependencias y empaquetado         |
| Docker              | Empaquetado y despliegue del backend          |

---

### 📁 Estructura principal del backend


La estructura del backend sigue una arquitectura limpia y modular:

- **src/main/java/com/example/demo/**
  - `config/` → Configuración general, incluyendo CORS
  - `controller/` → Controladores REST como `CustomerController`
  - `entities/` → Entidades: `Customer`, `Employee`, `Supplier`
  - `repository/` → Interfaces JPA (extends `CrudRepository`)
  - `services/` → Lógica de negocio y acceso a repositorios
  - `DemoApplication.java` → Clase principal de arranque


---

### 📦 Empaquetado WAR + Docker

El backend se empaqueta como un archivo `.war` para facilitar su despliegue en contenedores Docker y entornos productivos.

```bash
./mvnw clean package -DskipTests
```
Esto genera el archivo:

```bash
target/demo-0.0.1-SNAPSHOT.war
```
---

### 🔐 CORS y Seguridad

Para permitir que el frontend (en otro puerto/dominio) se comunique con la API, se implementó una configuración CORS:

```bash
@Configuration
@EnableWebMvc
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return registry -> registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*");
    }
}
```


### ✅ Endpoints REST implementados

| Método  | Ruta                    | Acción             |
|---------|-------------------------|--------------------|
| GET     | `/api/customers`        | Listar todos       |
| GET     | `/api/customers/{id}`   | Obtener por ID     |
| POST    | `/api/customers`        | Crear o actualizar |
| DELETE  | `/api/customers/{id}`   | Eliminar           |


---

## 🖥️ Frontend — React + Ionic + Vite + Android Studio

El frontend está construido con **React**, usando el motor de desarrollo moderno **Vite**, junto con **Ionic Framework** para componentes visuales adaptables a escritorio y dispositivos móviles.

---

### 🧰 Tecnologías usadas en el frontend

| Tecnología     | Uso principal                                      |
|----------------|----------------------------------------------------|
| React          | Framework de UI                                    |
| Ionic React    | Componentes UI móviles/responsivos                 |
| TypeScript     | Tipado estático en el frontend                     |
| React Router v6| Navegación por rutas                               |
| Vite           | Bundler y servidor de desarrollo rápido            |
| Android Studio | Simulación y pruebas móviles nativas               |

---

### 📁 Estructura general del frontend

- `src/pages/customer/CustomerList.tsx` → Listado de clientes
- `src/pages/customer/CustomerEdit.tsx` → Formulario para crear/editar
- `src/components/Menu.tsx` → Menú lateral reutilizable
- `src/pages/Page.tsx` → Página principal (dashboard/base)
- `src/components/ExploreContainer.tsx` → Componente base inicial
- `src/CustomerApi.ts` → Funciones para conectar con la API REST
- `.env` / `.env.production` → Variables para `VITE_API_URL`

---

### 🔌 Conexión con el backend usando `.env`

El frontend usa variables de entorno para comunicarse con el backend según el entorno:

```env
# .env (modo desarrollo local)
VITE_API_URL=http://localhost:8080/api/

# .env.production (despliegue)
VITE_API_URL=/api/
```
Estas variables son usadas en CustomerApi.ts para construir dinámicamente las URLs:

```bash
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/";
```
---
### 📱 Adaptación móvil y pruebas con Android Studio

La aplicación fue ejecutada exitosamente en **Android Studio**, utilizando **Capacitor + Ionic** para validar el comportamiento en móviles reales y emuladores.

---

### 🧪 Pruebas en Android Emulator

- ✅ **UI completamente responsive** gracias a componentes de Ionic
- ✅ Menú lateral (`Menu.tsx`) funciona como *drawer* colapsable en pantallas pequeñas
- ✅ CRUD funcional desde el emulador
- ✅ Pruebas realizadas usando navegador embebido del emulador

---

### ⚙️ Configuración de entorno para Android Emulator

Para que el emulador acceda correctamente al backend local, se configuró:

```env
# .env.development
VITE_API_URL=http://10.0.2.2:8080/api/
```
⚠️ 10.0.2.2 es una IP especial que Android Emulator usa para redirigir a localhost de tu máquina host.

---
### 🧱 Generar el build móvil con Ionic + Capacitor
Sigue estos pasos desde la raíz del frontend para compilar y abrir en Android Studio:
```bash
# 1. Instalar Capacitor
npm install @capacitor/core @capacitor/cli

# 2. Inicializar Capacitor (solo una vez)
npx cap init app-react com.tuempresa.appreact

# 3. Generar el build de producción
npm run build

# 4. Sincronizar el build con Android (genera carpeta android/)
npx cap add android
npx cap sync android

# 5. Abrir el proyecto directamente en Android Studio
npx cap open android
```
⚙️ Esto abrirá automáticamente el proyecto nativo en Android Studio, listo para emular o compilar en un dispositivo físico.

---

## 🔗 Integración Local — Frontend + Backend

Durante el desarrollo, el **frontend (React + Vite)** y el **backend (Spring Boot)** se ejecutaron en puertos separados y fueron conectados mediante:

- Variables de entorno `.env`
- Configuración CORS en Spring Boot
- API REST consumida con `fetch`

---

### 🔌 Comunicación entre servicios

- **Frontend en Vite**: corre por defecto en `http://localhost:5173`
- **Backend Spring Boot**: corre en `http://localhost:8080`

---

### 🧩 Configuración `.env` en el frontend

```env
# .env para desarrollo local
VITE_API_URL=http://localhost:8080/api/
```
Esto se usa dinámicamente en CustomerApi.ts:
```bash
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/";
```
---

### 🧪 Flujo de pruebas en desarrollo

1. **Levantar base de datos local con XAMPP (MySQL):**

   - Iniciar Apache y MySQL desde el panel de control de XAMPP.
   - Acceder al navegador y abrir: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   - Crear una base de datos llamada: `system`
   - Crear manualmente las siguientes tablas:
     - `customers`
     - `employees`
     - `suppliers`
       
   - Acceder a la base de datos importando el archivo `system.sql` directo a: [http://localhost/phpmyadmin](http://localhost/phpmyadmin) desde la carpeta dentro del proyecto.
  
    

2. **Configurar conexión en `application.properties` del backend:**

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/system
   spring.datasource.username=root
   spring.datasource.password=
   ```

Ejecutar backend:
```bash
./mvnw spring-boot:run
```
Ejecutar frontend:
```bash
npm run dev 
```
Acceder a la app:
```bash
http://localhost:5173
```
---
### Base de datos remota en VM Google Cloud (MariaDB + SSH + Workbench)

## 🌐 Base de datos remota — Google Cloud VM (MariaDB)

Para pruebas remotas en producción, se configuró una **instancia de máquina virtual (VM)** en **Google Cloud Platform (GCP)**, con el sistema operativo **Linux (Debian/Ubuntu)** y el motor de base de datos **MariaDB**.

---

### 🧰 Configuración de la instancia en Google Cloud

1. Ingresar a [https://console.cloud.google.com](https://console.cloud.google.com)
2. Ir a **Compute Engine > Instancias de VM**
3. Crear una nueva instancia con:
   - Sistema operativo: Debian/Ubuntu
   - IP externa estática (opcional para producción)
   - Puertos abiertos: `22`, `3306`, `8080` (configurado en el **firewall**)

4. En la sección **Redes > Firewall**, habilitar:
   - ✅ HTTP
   - ✅ HTTPS
   - Agregar **regla personalizada** para permitir conexiones en:
     - `0.0.0.0/0` en el puerto `3306` (solo para pruebas)
     - `8080` para exponer la API backend

---

### 🛠️ Instalación de MariaDB en la VM

Conectarse a la VM vía SSH desde la terminal de GCP o tu terminal local:

```bash
sudo apt update
sudo apt install mariadb-server
sudo systemctl start mariadb
sudo mysql_secure_installation
```
---
### 🛡️ Habilitar conexión remota a MariaDB
```bash
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

### 🔽 Cambiar:
```bash
bind-address = 127.0.0.1
```
### 🔁 Por:
```bash
bind-address = 0.0.0.0
```
---

### 👤 Crear usuario remoto para conectar con Workbench

Conectarse al cliente MariaDB:
```bash
sudo mysql -u root -p
```
Crear usuario y otorgar permisos:
```bash
CREATE USER 'springuser'@'%' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON *.* TO 'springuser'@'%';
FLUSH PRIVILEGES;
```
---
### 🔐 Conexión remota desde MySQL Workbench (usando túnel SSH)

1. **Abrir Workbench > New Connection:**
2. **Configurar:**
   - Connection Name: GCP Database
   - Hostname: `127.0.0.1`
   - Port: `3306` (puerto local del túnel) 
   - Username: springuser
   - Passsword: contraseña configurada en el usuario de mariadb

2. **Activar pestaña "SSH"**

   - SSH Hostname: `tu-ip-externa:22`
   - SSH Username: el mismo que en la VM
   - SSH Key o Password: Según la configuracion de acceso

---
### 🌐 Probar conexión con backend
Una vez conectado, configurar el `application.properties`:

```bash
spring.datasource.url=jdbc:mysql://<tu-ip-externa>:3306/system
spring.datasource.username=springuser
spring.datasource.password=yourpassword

```




