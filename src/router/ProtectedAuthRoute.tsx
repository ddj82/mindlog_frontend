import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedAuthRoute = () => {
    const accessToken = useAuthStore((state) => state.accessToken);

    return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedAuthRoute;