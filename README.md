# URL Shortener

## Descripción

Esta es una aplicación de acortador de URLs implementada con **Node.js** y **Express**, utilizando **MongoDB** como base de datos para almacenar los datos relacionados con las URLs y **Redis** para almacenar y manejar el contador de clics de forma eficiente. La aplicación también soporta autenticación mediante **JWT** y permite configurar tiempos de expiración para las URLs acortadas.

La aplicación se ejecuta en contenedores Docker, tanto para MongoDB como para Redis, lo que permite una configuración rápida y sencilla.

## Características

- **Generación de URLs cortas**: Permite acortar cualquier URL y obtener un enlace corto único.
- **Redirección**: Al acceder a una URL corta, se redirige automáticamente a la URL original.
- **Contador de clics**: Cada vez que se hace clic en una URL corta, se cuenta y almacena el número de clics.
- **Autenticación JWT**: Los usuarios pueden autenticarse con un token JWT para generar y gestionar sus URLs.
- **Tiempo de expiración**: Las URLs generadas pueden tener un tiempo de expiración configurado.
- **Persistencia de contador en Redis**: Los contadores de clics se almacenan temporalmente en Redis y se persisten a MongoDB periódicamente.
- **Docker**: MongoDB y Redis se levantan a través de contenedores Docker para facilitar la configuración y despliegue.
- **Documentación de los Endpoints con Swagger**: Toda la API está documentada utilizando **Swagger** para facilitar el uso e integración.

## Tecnologías

- **Node.js**: Plataforma de backend.
- **Express.js**: Framework web para Node.js.
- **Docker**: Contenedores para levantar MongoDB y Redis.
- **MongoDB**: Base de datos NoSQL para almacenar las URLs y los datos de los usuarios.
- **Redis**: Almacenamiento en memoria utilizado para gestionar un contador para que a partir de este se generen URLs unicas.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB en Node.js.
- **JWT (JSON Web Token)**: Autenticación y autorización de usuarios.
- **bcrypt**: Librería para encriptar contraseñas de los usuarios.
- **jsonwebtoken**: Librería para generar y verificar tokens JWT.
- **hashids**: Librería para generar IDs cortos y únicos a partir de un SALT definido.
- **swagger-jsdoc** y **swagger-ui-express**: Librerías utilizadas para documentar los endpoints de la API con Swagger.

## Estructura de la Base de Datos

La base de datos MongoDB contiene dos documentos

### `user`
Almacena la información de los usuarios registrados.
```js
{
   username: String,      // Nombre de usuario
   password: String,      // Contraseña encriptada
   email: String,         // Dirección de correo electrónico
   urls: [url]            // Urls pertenecientes al usuario
}
```
### `url`
Almacena la información de las urls acortadas
```js
{
   originalUrl: String,   // URL original
   shortUrl: String,      // URL corta generada
   clicks: Number,        // Contador de clics
   expirationTime: Date   // Fecha y hora de expiración de la URL
}
```
