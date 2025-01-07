# Mini Google Drive

Este proyecto es una aplicación web que permite a los usuarios subir, descargar, y gestionar archivos y carpetas, similar a Google Drive. La aplicación está construida con Node.js, Express, Prisma y utiliza PostgreSQL como base de datos.

## Requisitos

- Node.js (versión 14 o superior)
- PostgreSQL

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/mini-google-drive.git
    cd mini-google-drive
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo [.env](http://_vscodecontentref_/0) en la raíz del proyecto y añade las siguientes variables:

    ```env
    DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_de_datos
    SESSION_SECRET=tu-secreto-de-sesión
    ```

4. Configura la base de datos:

    ```sh
    npx prisma migrate deploy
    ```

5. Inicia la aplicación:

    ```sh
    npm start
    ```

    La aplicación estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

```plaintext
.env
.gitignore
package.json
prisma/
    migrations/
        ...
    schema.prisma
src/
    app.js
    controllers/
        authController.js
        fileController.js
        folderController.js
        indexController.js
    middleware/
        authmiddleware.js
        multer.js
    routes/
        authRoutes.js
        fileRoutes.js
        folderRoutes.js
        index.js
    server.js
    views/
        ...
uploads/