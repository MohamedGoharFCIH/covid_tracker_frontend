import { useContext, useEffect } from "react";
import UserContext from "../services/UserContext";
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


export default ProtectedRoute;