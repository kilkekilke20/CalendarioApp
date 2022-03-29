import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { PaginaPrincipalScreen } from '../components/PaginaPrincipal/PaginaPrincipalScreen';

//rutas generales dentro del calendario
// aqui se podran meter todas las rutas privadas
export const DashboardPublicRoutes = () => {
    return (
        <>

            <div>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/PaginaPrincipal/login" element={<PaginaPrincipalScreen />} />
                </Routes>
            </div>
        </>
    )
}
