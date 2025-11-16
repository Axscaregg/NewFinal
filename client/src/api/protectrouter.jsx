import { Navigate } from "react-router-dom";

function Protectrouter({children}){
    const token = localStorage.getItem("accessToken")
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default Protectrouter