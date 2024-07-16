import pytest
from fastapi.testclient import TestClient
from bson import ObjectId
from app import app
from databaseNoSql import peliculas as db_peliculas

client = TestClient(app)

#Reset de base de datos antes y despues de prueba
@pytest.fixture(autouse=True)
def clear_db():
    db_peliculas.delete_many({})
    yield
    db_peliculas.delete_many({})

#Comprobación añadir película
def test_add_movie():
    new_movie = {
        "nombre": "Nueva Película",
        "director": "Director Nuevo",
        "año": 2022,
        "nota_media": 3.0,
        "img": "Imagen URL"
    }
    response = client.post("/peliculas/", json=new_movie)
    assert response.status_code == 200

    inserted_movie = response.json()
    assert inserted_movie["nombre"] == "Nueva Película"
    assert inserted_movie["director"] == "Director Nuevo"
    assert inserted_movie["año"] == 2022
    assert inserted_movie["nota_media"] == 3.0
    assert inserted_movie["img"] == "Imagen URL"

    db_movie = db_peliculas.find_one({"nombre": "Nueva Película"})
    assert db_movie is not None
    assert db_movie["nombre"] == "Nueva Película"
    assert db_movie["director"] == "Director Nuevo"
    assert db_movie["año"] == 2022
    assert db_movie["nota_media"] == 3.0
    assert db_movie["img"] == "Imagen URL"

#Comprobación actualizar pelicula
def test_update_movie():

    original_movie = {
        "nombre": "Película Original",
        "director": "Director Original",
        "año": 2021,
        "nota_media": 4.0,
        "img": "Imagen Original"
    }
    result = db_peliculas.insert_one(original_movie)
    movie_id = str(result.inserted_id)

    updated_data = {
        "nombre": "Película Actualizada",
        "director": "Director Actualizado",
        "año": 2022,
        "nota_media": 4.5,
        "img": "Imagen Actualizada"
    }

    response = client.put(f"/peliculas/{movie_id}", json=updated_data)
    assert response.status_code == 200

    updated_movie = response.json()
    assert updated_movie["nombre"] == "Película Actualizada"
    assert updated_movie["director"] == "Director Actualizado"
    assert updated_movie["año"] == 2022
    assert updated_movie["nota_media"] == 4.5
    assert updated_movie["img"] == "Imagen Actualizada"

    db_movie = db_peliculas.find_one({"_id": ObjectId(movie_id)})
    assert db_movie is not None
    assert db_movie["nombre"] == "Película Actualizada"
    assert db_movie["director"] == "Director Actualizado"
    assert db_movie["año"] == 2022
    assert db_movie["nota_media"] == 4.5
    assert db_movie["img"] == "Imagen Actualizada"

#Comprobación eliminar pelicula
def test_delete_movie():

    movie_to_delete = {
        "nombre": "Película para Eliminar",
        "director": "Director para Eliminar",
        "año": 2020,
        "nota_media": 2.0,
        "img": "Imagen para Eliminar"
    }
    result = db_peliculas.insert_one(movie_to_delete)
    movie_id = str(result.inserted_id)

    response = client.delete(f"/peliculas/{movie_id}")
    assert response.status_code == 200

    db_movie = db_peliculas.find_one({"_id": ObjectId(movie_id)})
    assert db_movie is None

#Comprobación filtrado de película
def test_filter_movie_by_name():

    movies = [
        {"nombre": "Película 1", "director": "Director 1", "año": 2020, "nota_media": 4.0, "img": "Imagen 1"},
        {"nombre": "Película 2", "director": "Director 2", "año": 2021, "nota_media": 4.5, "img": "Imagen 2"},
        {"nombre": "Película 3", "director": "Director 3", "año": 2022, "nota_media": 3.5, "img": "Imagen 3"}
    ]
    db_peliculas.insert_many(movies)

    # Filtrar por nombre "Película 2"
    response = client.get("/peliculas/filtrar/?nombre=Película 2")
    assert response.status_code == 200

    filtered_movies = response.json()
    assert len(filtered_movies) == 1
    assert filtered_movies[0]["nombre"] == "Película 2"
    assert filtered_movies[0]["director"] == "Director 2"
    assert filtered_movies[0]["año"] == 2021
    assert filtered_movies[0]["nota_media"] == 4.5
    assert filtered_movies[0]["img"] == "Imagen 2"
