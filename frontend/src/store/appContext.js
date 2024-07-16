
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Crea el contexto
export const AppContext = createContext();

// Crea el proveedor del contexto
export const AppProvider = ({ children }) => {
    const [peliculas, setPeliculas] = useState([]);
    const [details, setDetails] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const imageImport = process.env.REACT_APP_IMAGE_IMPORT;

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${backendUrl}/peliculas/`);
            if (response.ok) {
                const data = await response.json();
                setPeliculas(data);
            } else {
                toast.error('Error al obtener las películas')
                console.error('Error al obtener las películas');
            }
        } catch (error) {

            console.error('Error en la petición:', error);
        }
    };

    const newFilm = async (formData) =>{
        try {
            const response = await fetch(`${backendUrl}/peliculas/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
      
            if (!response.ok) {
                const errorMessage = await response.json(); 
                toast.error(errorMessage.detail[0].msg)
                throw new Error(errorMessage.detail || 'Error al agregar la película'); 
            }
      
            const data = await response.json();
            fetchPeliculas()
        }catch (error) {
            console.error('Error al enviar los datos:', error);
            // Manejo de errores aquí
          }
    };

    const fetchDetails = async (id) => {
        const pelicula = peliculas.find((p) => p.id === id);
        if (pelicula) {
            setDetails(pelicula);
        } else {
            console.error('Película no encontrada');
        }
    };

    const deleteMovie = async (id) => {
        try {
            const response = await fetch(`${backendUrl}/peliculas/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                toast.error('Error al eliminar la película')
                throw new Error('Error al eliminar la película');
            }

            fetchPeliculas();
        } catch (error) {
            console.error('Error al eliminar la película:', error);
        }
    };

    const updateMovie = async (id, updatedData) => {
        try {
            const response = await fetch(`${backendUrl}/peliculas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                const errorMessage = await response.json(); 
                toast.error(errorMessage.detail[0].msg);
                throw new Error('Error al actualizar la película');
            }

            await fetchPeliculas();
            await fetchDetails(id)
        } catch (error) {
            console.error('Error al actualizar la película:', error);
        }
    };
    
    const filterMovies = async (filtro) => {
        try {
            let url = `${backendUrl}/peliculas/filtrar/`;
    
            if (filtro) {
                const queryParams = new URLSearchParams();
                if (filtro.nombre) queryParams.append('nombre', filtro.nombre);
                if (filtro.director) queryParams.append('director', filtro.director);
                if (filtro.año) queryParams.append('año', filtro.año);
                if (filtro.nota_media) queryParams.append('nota_media', filtro.nota_media);
                url += `?${queryParams.toString()}`;
            }
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                setPeliculas(data); 

            } else {
                toast.error('Error al filtrar películas');
                fetchPeliculas();
            }
        } catch (error) {
            fetchPeliculas();
        }
    };
    


      const uploadImage = async (body) => {
        console.log(backendUrl);
        console.log(body);
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/dx9hfbqam/image/upload`,
                    {
                        method: "POST",
                        body: body
                    }
                )
                const data = await res.json();
                return (data.secure_url)
            }

    return (
        <AppContext.Provider value={{ peliculas, setPeliculas, fetchPeliculas, newFilm, details, fetchDetails, deleteMovie, updateMovie, filterMovies, uploadImage }}>
            {children}
        </AppContext.Provider>
    );
};
