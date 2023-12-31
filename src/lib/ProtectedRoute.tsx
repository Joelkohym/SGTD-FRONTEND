import {Navigate, useLocation} from "react-router-dom"
import { AppRoutes } from './constants';

const ProtectedRoute = ({children} : any) => {
    const token = localStorage.getItem("access_token")
    let location = useLocation();

    if(!token) {
        return <Navigate to={AppRoutes.Login} state={{ from: location}} replace />
    }
    return children
};

export default ProtectedRoute;