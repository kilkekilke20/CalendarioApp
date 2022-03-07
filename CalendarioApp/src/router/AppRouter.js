import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarioScreen } from '../components/calendario/CalendarioScreen';

//anotacion importante para mi -.-, en la version v6 de doom hacia adelante el:
// switch se cambia a routes
// el component pasa a ser element
// dentro del element tiene que estar entre < /> el nombre de la ruta
// el redirect ahora pasa a set navigate, la sintaxis la complicaron un poco, antes era(<Redicrect to?"/" />) y ahora he tenido que buscar en foros y poner (<Route path="*" element={<Navigate to ="/" />}/>)
// espero que no se me pase nada
export const AppRouter = () => {
  return (
    <Router>
        <div>
            <Routes>
                <Route exact path='/login' element={ <LoginScreen /> } />
                <Route exact path='/' element={ <CalendarioScreen /> } />
                <Route path="*" element={<Navigate to ="/" />}/>
            </Routes>
        </div>
    </Router>
  )
}
