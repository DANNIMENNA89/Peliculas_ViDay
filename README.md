# Proyecto ViDay Películas 🎥

Este proyecto es una aplicación web para gestionar una base de datos de películas, desarrollada con un frontend en React y un backend en FastAPI. Utiliza Docker y Docker Compose para facilitar la configuración y ejecución del entorno de desarrollo.

## Requisitos Funcionales

- **Agregar película:** Permite agregar una película con los campos Nombre, Director, Año, Nota media e Imagen.
- **Actualizar película:** Permite actualizar los detalles de una película existente.
- **Eliminar película:** Permite eliminar una película de la plataforma.
- **Filtrar películas:** Permite filtrar películas por Nombre, Director, Año o Nota media, con la posibilidad de combinar varios criterios de filtrado.

## Stack Tecnológico

### Backend

El backend está desarrollado con Python y FastAPI.

### Frontend

El frontend está desarrollado con React.

### Base de datos

Se utiliza MongoDB como base de datos para almacenar la información de las películas.

### Librerías adicionales

- **Bootstrap:** Utilizado para el diseño y la interfaz de usuario.
- **Toastify:** Para mostrar alertas y notificaciones en la aplicación.
- **Cloudinary:** Para la gestión de imágenes, permitiendo almacenar y servir imágenes de manera eficiente.

### Pruebas Unitarias
  
Se han incluido pruebas unitarias para verificar el funcionamiento adecuado del backend utilizando el framework pytets.

  
## Instrucciones de Ejecución

### 1. Clonar el Repositorio

Primero, clona el repositorio a tu máquina local:

- git clone https://github.com/tu-usuario/tu-repositorio.git
- cd tu-repositorio

### 2. Revisa el archivo .env, el cual se encuentra en el directorio raíz del proyecto y actualiza las variables de entorno, si lo ves conveniente.

### 3. Si en el archivo .env de del directorio raiz, has modificado el puerto BACKEND_PORT, dirigete al archivo .env que se encuentra en la carpeta frontend, y modifica con el puerto la variable REACT_APP_BACKEND_URL.

### 4. Ejecuta el siguiente comando para construir y levantar los servicios definidos en docker-compose.yml:

- docker-compose up --build

Esto construirá las imágenes de Docker para el frontend y el backend, y levantará los contenedores junto con un contenedor de MongoDB. 

### 5. Si quieres realizar las pruebas unitarias de los endpoint´s realizadas

- cd backend
- pytest test.py

