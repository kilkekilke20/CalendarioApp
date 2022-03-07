import React from 'react'

export const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
        <span className='navbar-brand'>
            CalendarioApp, organiza tus proyectos con tus compañeros
        </span>
        
        <button className='btn btn-outline-danger'>
            <i className='fas fa-sign-out-alt'></i>
            <span> SALIR</span>
        </button>

    </div>
  )
}
