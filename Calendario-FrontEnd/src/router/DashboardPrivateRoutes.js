import { Routes, Route } from 'react-router-dom';
import { CalendarioScreen } from '../components/calendario/CalendarioScreen';

import { PerfilScreen } from '../components/perfil/PerfilScreen';

//rutas generales dentro del calendario
// aqui se podran meter todas las rutas privadas
export const DashboardPrivateRoutes = () => {
    return (
        <>

            <div>
                <Routes>
                    <Route path="/Calendario" element={<CalendarioScreen />} />
                    <Route path="/perfil" element={<PerfilScreen />} />
                </Routes>
            </div>
        </>
    )
}
