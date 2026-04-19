import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div className="min-h-screen text-black flex justify-center items-center"><h1>Loading...</h1></div>
    }

    if (user) {
       return children
    }

    return <Navigate state={location?.pathname} to="/register"></Navigate>
};

export default PrivetRoute;