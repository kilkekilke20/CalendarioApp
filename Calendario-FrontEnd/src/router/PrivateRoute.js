import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, uid }) => {
  //si cierras sesion (no existe uid) te lleva a la pagina principal
  return !!uid
    ? children
    : <Navigate to='/PaginaPrincipal' />
}