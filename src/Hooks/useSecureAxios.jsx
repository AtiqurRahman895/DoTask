import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


export const secureAxios = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://do-task-server-topaz.vercel.app',
});

const useSecureAxios = (safeEmail="") => {

    const navigate = useNavigate();
    const {logoutUser } = useContext(AuthContext);

    secureAxios.interceptors.request.use(function (config) {
        const token=localStorage.getItem("token")
        // const role=localStorage.getItem("role")
        const email=localStorage.getItem("email")

        if(token&&email){
            config.headers={
                safeEmail,
                token:`Bearer ${token}`,
                email,
                // role,
            }
        }

        return config;
      }, function (error) {
        return Promise.reject(error);
    });

    secureAxios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
              logoutUser();
              toast.error(error.response.data?.message);
              navigate("/login");
            }
            return Promise.reject(error);
      });

    return secureAxios

};

export default useSecureAxios;