import './App.css';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../src/store/appContext';
import { Card } from './components/Card';
import { Navbar } from './components/Navbar';
import Filter from './components/Filter';

function App() {
    const { peliculas } = useContext(AppContext);
    const { fetchPeliculas } = useContext(AppContext);

    useEffect(() => {
        fetchPeliculas();
    }, []);

    return (
        <div className="App container">
            <Navbar />
            <Filter />
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 m-auto mb-4'>
                {peliculas.map(pelicula => (
                    <div key={pelicula.id} className="col col-12 col-md-6 col-lg-4">
                        <Card
                            nombre={pelicula.nombre}
                            img={pelicula.img}
                            director={pelicula.director}
                            año={pelicula.año}
                            nota_media={pelicula.nota_media}
                            id={pelicula.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
