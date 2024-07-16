import React, { useState, useContext } from 'react';
import { AppContext } from '../store/appContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ModalUpdate = ({ show, handleClose, details, id }) => {
    const { updateMovie, uploadImage } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: details.nombre,
        director: details.director,
        año: details.año,
        nota_media: details.nota_media,
        img: details.img
    });

    const [isUploading, setIsUploading] = useState(false); // Estado para controlar la carga de la imagen

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const changeUploadImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Presents_react");

        setIsUploading(true); // Inicia la carga de la imagen

        try {
            const newImage = await uploadImage(data); // Llamada a la función uploadImage del contexto
            setFormData(prevState => ({
                ...prevState,
                img: newImage // Actualizamos el formData con la nueva URL de la imagen
            }));
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        } finally {
            setIsUploading(false); // Finaliza la carga de la imagen
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateMovie(id, formData);
        navigate(`/details/${id}`);
        handleClose();
    };

    // Verificar si todos los campos obligatorios tienen valor y si la imagen ha sido subida
    const isFormValid = formData.nombre && formData.director && formData.año && formData.nota_media && formData.img && !isUploading;

    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Actualizar Película</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre:</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="director" className="form-label">Director:</label>
                                <input type="text" className="form-control" id="director" name="director" value={formData.director} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="año" className="form-label">Año:</label>
                                <input type="number" className="form-control" id="año" name="año" value={formData.año} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nota_media" className="form-label">Nota Media (Entre 1 y 5):</label>
                                <input type="number" step="0.1" className="form-control" id="nota_media" name="nota_media" value={formData.nota_media} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img" className="form-label">Subir Imagen:</label>
                                <input type="file" className="form-control" id="img" name="img" onChange={changeUploadImage} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleClose}>Cancelar</button>
                                <button type="submit" className={`button rounded border-0 mb-2 p-2 ${!isFormValid ? 'disabled' : ''}`} disabled={!isFormValid}>Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalUpdate.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
};

export default ModalUpdate;
