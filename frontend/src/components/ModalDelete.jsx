import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const ModalDelete = (props) => {

    const { deleteMovie } = useContext(AppContext);
    const navigate = useNavigate();

    const deleteOneFilm = async () => {
        await deleteMovie(props.id)
        navigate('/');
    };

    return (
        <div className={`modal ${props.show ? 'show' : ''}`} style={{ display: props.show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Eliminar Película</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={props.handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Está seguro de que desea eliminar esta película?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={props.handleClose}>Cancelar</button>
                        <button type="button" className="button rounded border-0 mb-2 p-2" onClick={deleteOneFilm}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalDelete.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    id:PropTypes.string
};

export default ModalDelete;
