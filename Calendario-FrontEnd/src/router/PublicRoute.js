import React from 'react'
import { Navigate } from 'react-router-dom'

//si tienes sesion iniciada (existe uid) puedes entrar al calendario
export const PublicRoute = ({ children, uid }) => {
  return !!uid
    ? <Navigate to='/Calendario' />
    : children

}