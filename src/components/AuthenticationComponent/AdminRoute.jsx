import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";

const AdminRoute = ({children}) => {
    const {user,loading,logoutUser}=useContext(AuthContext)
    const role=localStorage.getItem("role")

    useEffect(() => {
        if (user && role && role !== "admin") {
          logoutUser();
          toast.error("You are not authorized to enter this page!");
        }
      }, [user, role, logoutUser]);
    
      if (loading) {
        return <Loading />;
      }
    
      if (user && role === "admin") {
        return children;
      }
    return <Navigate to={"/login"}></Navigate>
};

export default AdminRoute;