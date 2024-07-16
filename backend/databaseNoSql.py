from pymongo import MongoClient
import os

# Obtener la URL de conexión desde una variable de entorno
mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/')

# Conexión al servidor de MongoDB
client = MongoClient(mongo_url)

# Seleccionar la base de datos (si no existe, se creará automáticamente)
db = client['cineDB']

# Seleccionar la colección de películas
peliculas = db['peliculas']
