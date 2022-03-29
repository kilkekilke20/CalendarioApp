import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { PaginaPrincipalScreen } from '../components/PaginaPrincipal/PaginaPrincipalScreen';
import { DashboardPrivateRoutes } from './DashboardPrivateRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

//anotacion importante para mi -.-, en la version v6 de doom hacia adelante el:
// switch se cambia a routes
// el component pasa a ser element
// dentro del element tiene que estar entre < /> el nombre de la ruta
// el redirect ahora pasa a set navigate, la sintaxis la complicaron un poco, antes era(<Redicrect to?"/" />) y ahora he tenido que buscar en foros y poner (<Route path="*" element={<Navigate to ="/" />}/>)
// espero que no se me pase nada
export const AppRouter = () => {

  const dispatch = useDispatch();

  //
  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  // checking = true,se esta autenticando
  if (checking) {
    //intentar usar swal
    return <h5>Un momento....</h5>
  }

  //aqui defino las rutas publicas y privadas, he tenido bastantes problemas con los redirects por lo que puede ser un caos :v
  // si el usuario esta autentificado (checking = false) lo redirijira al calendario, no le dejara volver al login hasta que cierre sesion
  // si no lo esta pues solo puede acceder al login


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/PaginaPrincipal" element={<PaginaPrincipalScreen />} />
          <Route exact path='/PaginaPrincipal/login' element={
            <PublicRoute uid={!!uid} >
              <LoginScreen />
            </PublicRoute>
          }
          />

          <Route exact path='/*'
            element={
              <PrivateRoute uid={!!uid}>
                <DashboardPrivateRoutes />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}
