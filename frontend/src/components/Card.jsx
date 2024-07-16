import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../store/appContext'; // Ruta corregida

export const Card = (props) => {
    const navigate = useNavigate();
    const { fetchDetails } = useContext(AppContext);

    const seeDetails = async () => {
        await fetchDetails(props.id); 
        navigate(`/details/${props.id}`);
    }

    return (
        <div className="card border border-3" style={{ width: '18rem', height: "350px" }}>
            <img src={props.img} className="card-img-top" alt="Film img" style={{ height: "250px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">{props.nombre}</h5>
                <div className="mt-auto">
                    <button className='button rounded' type="button" onClick={seeDetails}>
                        Ver mas
                    </button>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = { 
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
};
