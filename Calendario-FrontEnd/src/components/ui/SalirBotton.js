import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

//funcion del boton para salir y cerrar sesion
export const SalirBotton = () => {

    const dispatch = useDispatch();

    //llamo a la funcion startlogout
    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div>
            <button
                className='btn btn-outline-danger col-10 m-1'
                onClick={handleLogout}
            >
                <i className='fas fa-sign-out-alt'></i>
                <span> SALIR</span>
            </button>
        </div>
    )
}
