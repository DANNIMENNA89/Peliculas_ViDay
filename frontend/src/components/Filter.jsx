// Filter.jsx

import React, { useState, useContext } from 'react';
import { AppContext } from '../store/appContext';

const Filter = () => {
    const { filterMovies } = useContext(AppContext);
    const [filtro, setFiltro] = useState({
        nombre: '',
        director: '',
        año: '',
        nota_media: ''
    });

    const handleChange = (e) => {
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(filtro);
        filterMovies(filtro);
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Nombre" name="nombre" value={filtro.nombre} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Director" name="director" value={filtro.director} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input type="number" className="form-control" placeholder="Año" name="año" value={filtro.año} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input type="number" step="0.1" className="form-control" placeholder="Nota Media" name="nota_media" value={filtro.nota_media} onChange={handleChange} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="button rounded p-2">Buscar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Filter;
