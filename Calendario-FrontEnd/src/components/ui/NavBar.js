import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModoOscuroClaro } from '../../helpers/ModoOscuroClaro';
import { DropDownPerfil } from './DropDownPerfil';
import { SalirBotton } from './SalirBotton';

export const NavBar = () => {

  const { name } = useSelector(state => state.auth);
  const usuario = localStorage.getItem('firebase');
  //cambiar el link segun si la sesion esta iniciada o no
  const ConditionalLink = ({ to, condition }) => (!!condition && to)
    ? <Link className='btn btn-primary col-10 m-1 ' to="/Calendario">Calendario</Link>
    : <><Link className='btn btn-primary col-10 m-1 ' to="/PaginaPrincipal/login">Login</Link></>
    ;

  //Mostrar desplegable del perfil
  const MostrarPerfil = () => {
    return (
      <OcultarGoogleDesplegable />
    )
  }

  //Ocultar desplegable del perfil
  const OcultarPerfil = () => {
    return (
      <></>
    )
  }

  //ocultar desplegable si es una cuenta de google
  const OcultarGoogleDesplegable = () => {
    if (usuario) {
      return (
        <SalirBotton />
      )
    } else {
      return (
        <DropDownPerfil />
      )
    }
  }

  //Mostrar o Ocultar desplegable del perfil si la sesion esta iniciada o no
  const MostrarOcultarPerfil = () => {
    if (name !== undefined) {
      return (
        <MostrarPerfil />
      );
    } else {
      return (
        <OcultarPerfil />
      )
    };
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

      <div className="navbar-collapse">
        <ModoOscuroClaro />
        <div className="navbar-nav">

          <Link
            className='btn btn-primary col-10 m-1 '
            to="/PaginaPrincipal"
          >
            Pagina Principal
          </Link>

          <ConditionalLink
            to="/PaginaPrincipal/login"
            condition={name !== undefined}
          >
            Login
          </ConditionalLink>

        </div>
      </div>

      <MostrarOcultarPerfil />
    </nav>
  )
}
