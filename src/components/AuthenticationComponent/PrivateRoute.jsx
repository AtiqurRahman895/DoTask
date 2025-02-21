import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "./Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    if(loading){
        return <Loading/>
    }
    if(user){
        return children
    }
    return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoute;


