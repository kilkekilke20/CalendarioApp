import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SalirBotton } from './SalirBotton';
export const DropDownPerfil = () => {

    
    const { name } = useSelector(state => state.auth);

    return (
        <div className="dropdown mostrarComponente">
            <button
                className="btn btn-secondary dropdown-toggle "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {name}
            </button>

            <ul
                className="dropdown-menu dropdown-menu-right dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton1"
            >
                <li>
                    <Link
                        className='btn btn-primary col-10 m-1 '
                        to="/perfil"
                    >
                        perfil
                    </Link>
                </li>

                <div className="dropdown-divider"></div>

                <li>
                    <SalirBotton />
                </li>

            </ul>
        </div>
    )
}
