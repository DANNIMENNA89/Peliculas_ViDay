import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../store/appContext';
import ModalDelete from '../components/ModalDelete';
import ModalUpdate from '../components/ModalUpdate';
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const params = useParams();
    const { details, fetchDetails } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setShowModal(true); 
    };

    const handleUpdateClick = () => {
        setShowUpdateModal(true);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchDetails(params.theid)
    });

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', padding: '20px' }}>
            {details ? (
                <div className='d-flex' style={{ maxWidth: '800px' }}>
                    <div style={{ flex: '1 1 50%', paddingRight: '20px' }}>
                        <h1 className='text-white' style={{ fontSize: '2em', marginBottom: '10px' }}>{details.nombre}</h1>
                        <h2 className='text-white' style={{ fontSize: '1.2em' }}><strong>Director:</strong> {details.director}</h2>
                        <p className='text-white' style={{ fontSize: '1.2em' }}><strong>Año:</strong> {details.año}</p>
                        <p className='text-white' style={{ fontSize: '1.2em' }}><strong>Nota Media:</strong> {details.nota_media}</p>
                        <div style={{ marginTop: '20px' }}>
                            <button className='button rounded border-0 mb-2 p-3' style={{ marginRight: '10px',fontSize: '1em' }} onClick={handleUpdateClick}>Actualizar</button>
                            <button className='btn btn-danger p-3 mb-2'  style={{marginRight: '10px', fontSize: '1em' }} onClick={handleDeleteClick}>Eliminar</button>
                            <button className='btn btn-primary p-3 mb-2' style={{ marginRight: '10px', fontSize: '1em' }} onClick={handleGoBack}>Atras</button>
                        </div>
                    </div>
                    <div style={{ flex: '1 1 50%', paddingLeft: '20px' }}>
                        <img src={details.img} alt={details.nombre} style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </div>
            ) : (
                <p style={{ fontSize: '1.5em' }}>Cargando detalles...</p>
            )}

            <ModalDelete show={showModal} handleClose={() => setShowModal(false)} id={params.theid}/>
            <ModalUpdate show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} details={details} id={params.theid}/>
        </div>
    );
};

export default Details;
