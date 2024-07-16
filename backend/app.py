from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator
from bson import ObjectId  # Importa ObjectId de bson
import databaseNoSql as db
from datetime import datetime

app = FastAPI() 

# Lista de orígenes permitidos 
origins = [
    "http://localhost:3000",
    "http://frontend:3000", 
    "*" # Como es una prueba, dejamos un asterisco para que permita el acceso a cualquier origen
]

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

current_year = datetime.now().year

class Movie(BaseModel):
    id: str
    nombre: str
    director: str
    año: int
    nota_media: float = Field(..., ge=1.0, le=5.0)
    img: str

class Movie_New(BaseModel):
    nombre: str
    director: str
    año: int
    nota_media: float = Field(..., ge=1.0, le=5.0)
    img: str

    @field_validator('año')
    def validate_year(cls, v):
        if v < 1880 or v > current_year:
            raise ValueError(f'Fecha no valida, debe estar entre 1880 y {current_year}')
        return v

class Movie_Optional(BaseModel):
    nombre: Optional[str] = None
    director: Optional[str] = None
    año: Optional[int] = None
    nota_media: Optional[float] = Field(None, ge=1.0, le=5.0)
    img: str

    @field_validator    ('año')
    def validate_year(cls, v):
        if v is not None and (v < 1880 or v > current_year):
            raise ValueError(f'Fecha no valida, debe estar entre 1880 y {current_year}')
        return v

# Endpoint GET para obtener todas las películas
@app.get("/peliculas/", response_model=List[Movie])
def read_all_movies():
    movies = []
    resultado = db.peliculas.find()
    for pelicula in resultado:
        nombre = pelicula.get('nombre')
        director = pelicula.get('director')
        año = pelicula.get('año')
        nota_media = pelicula.get('nota_media')
        img = pelicula.get('img')        
        id = str(pelicula.get('_id')) 

        if nombre and director and año and nota_media:
            movies.append(Movie(id=id, nombre=nombre, director=director, año=año, nota_media=nota_media, img=img))
    return movies

# Endpoint POST para agregar una película
@app.post("/peliculas/", response_model=Movie_New)
def add_movie(movie: Movie_New):
    new_movie = dict(movie)
    result = db.peliculas.insert_one(new_movie)   

    if result.acknowledged and result.inserted_id:
        inserted_movie = db.peliculas.find_one({"_id": result.inserted_id})
        return movie
    else:
        raise HTTPException(status_code=500, detail="Error al añadir la película")

# Endpoint PUT para actualizar una película, según id
@app.put("/peliculas/{id}", response_model=Movie)
def update_movie(id: str, movie: Movie_Optional):
    update_data = dict(movie)
    result = db.peliculas.update_one({"_id": ObjectId(id)}, {"$set": update_data})

    if result.modified_count == 1:
        updated_movie = db.peliculas.find_one({"_id": ObjectId(id)})
        return Movie(
            id=str(updated_movie["_id"]),
            nombre=updated_movie["nombre"],
            director=updated_movie["director"],
            año=updated_movie["año"],
            nota_media=updated_movie["nota_media"],
            img=updated_movie["img"]
        )

    raise HTTPException(status_code=404, detail=f"No se encontró la película con id {id} o no se realizaron cambios")

# Endpoint DELETE para eliminar una película, según id
@app.delete("/peliculas/{id}")
def delete_movie(id: str):
    result = db.peliculas.delete_one({'_id': ObjectId(id)})  

    if result.deleted_count == 1:
        return {"mensaje": f"Película con id {id} eliminada correctamente"}
    else:
        raise HTTPException(status_code=404, detail=f"No se encontró la película con id {id}")

# Endpoint GET para filtrar películas por Nombre, Director, Año o Nota media
@app.get("/peliculas/filtrar/", response_model=List[Movie])
def filter_movies(
    nombre: Optional[str] = None,
    director: Optional[str] = None,
    año: Optional[int] = None,
    nota_media: Optional[float] = None
):
    query = {}
    if nombre:
        query["nombre"] = nombre
    if director:
        query["director"] = director
    if año:
        if año < 1900 or año > current_year:
            raise HTTPException(status_code=400, detail=f'El año debe estar entre 1900 y {current_year}')
        query["año"] = año
    if nota_media:
        query["nota_media"] = nota_media
    movies = []
    resultado = db.peliculas.find(query)
    for pelicula in resultado:
        id = str(pelicula.get('_id'))
        nombre = pelicula.get('nombre')
        director = pelicula.get('director')
        año = pelicula.get('año')
        nota_media = pelicula.get('nota_media')
        img = pelicula.get('img', '')
        movies.append(Movie(id=id, nombre=nombre, director=director, año=año, nota_media=nota_media, img=img))

    return movies
