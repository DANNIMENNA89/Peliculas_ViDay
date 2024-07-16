import React, { useState, useContext } from 'react';
import { AppContext } from '../store/appContext';

const ModalAddFilm = ({ showModal, setShowModal }) => {
    const { newFilm, uploadImage } = useContext(AppContext);
    const [formData, setFormData] = useState({
        nombre: '',
        director: '',
        año: '',
        nota_media: '',
        img: ''
    });
    const [isUploading, setIsUploading] = useState(false); // Estado para controlar la carga de la imagen

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imgValue = formData.img.trim() === '' ? '/no_pelicula.jpg' : formData.img;

        const formDataWithDefaultImg = { ...formData, img: imgValue };

        await newFilm(formDataWithDefaultImg);

        setFormData({
            nombre: '',
            director: '',
            año: '',
            nota_media: '',
            img: ''
        });

        setShowModal(false);
    };

    // Verificar si todos los campos obligatorios tienen valor y si la imagen ha sido subida
    const isFormValid = formData.nombre && formData.director && formData.año && formData.nota_media && formData.img && !isUploading;

    return (
        <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-black">Añadir Película</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label text-black">Nombre *</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="director" className="form-label text-black">Director *</label>
                                <input type="text" className="form-control" id="director" name="director" value={formData.director} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="año" className="form-label text-black">Año *</label>
                                <input type="number" className="form-control" id="año" name="año" value={formData.año} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nota_media" className="form-label text-black">Nota Media (Entre 1 y 5) *</label>
                                <input type="number" step="0.1" min="1" max="5" className="form-control" id="nota_media" name="nota_media" value={formData.nota_media} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img" className="form-label text-black">Subir Imagen *</label>
                                <input type="file" className="form-control" id="img" name="img" onChange={changeUploadImage} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="button p-2 rounded" onClick={() => setShowModal(false)}>Cancelar</button>
                        <button type="button" className={`button rounded border-0 mb-2 p-2 ${!isFormValid ? 'disabled' : ''}`} onClick={handleSubmit} disabled={!isFormValid}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddFilm;
