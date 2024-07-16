import React, { useState } from 'react'
import ModalAddFilm from './ModalAddFilm'

export  function Navbar() {
    const [showModal, setShowModal] = useState(false);

  return (
    <div className='d-flex justify-content-between'>
        <h1 className="mt-5 mb-4 text-center">Plataforma de Películas</h1>
        <button className='button rounded btn-sm align-self-center ms-auto p-2' type="button" onClick={() => setShowModal(true)}>
            Añadir película
        </button>

        <ModalAddFilm showModal={showModal} setShowModal={setShowModal} />
    </div>

  )
}

