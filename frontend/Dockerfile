# Usa la imagen oficial de Node.js como base
FROM node:20.11.1

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json y los instala
COPY package*.json ./

RUN npm install

# Copia el código de la aplicación en el contenedor
COPY . .

# Compila la aplicación React
RUN npm run build

# Usa un servidor web ligero para servir la aplicación
# Por ejemplo, se puede usar serve (necesita instalar serve globalmente primero)
RUN npm install -g serve

# Comando para ejecutar el servidor y servir la aplicación
CMD ["serve", "-s", "build"]
