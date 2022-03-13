import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const NavBar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);

  //llamo a la funcion startlogout
  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className='navbar-brand'>
        CalendarioApp, organiza tus proyectos con tus compañeros, Bienvenido {name}
      </span>

      <button
        className='btn btn-outline-danger'
        onClick={handleLogout}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span> SALIR</span>
      </button>

    </div>
  )
}
