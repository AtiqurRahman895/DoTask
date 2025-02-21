import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { normalAxios } from "./useNormalAxios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const useGetUserRole = () => {
    const { logoutUser, user, loading: userLoading } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const token = localStorage.getItem("token");

    // Prevent fetching if user is still loading
    const shouldFetch = !userLoading;

    const fetchUserRole = async () => {
        let role = localStorage.getItem("role") || "guest";

        if (!shouldFetch) {
            return role;
        }

        if (!user?.email || !token) {
          localStorage.setItem("role","guest")
          return "guest"
        }else{
            try {
              const res = await normalAxios.get(`/user/${user.email}`, {
                  headers: {
                      token: `Bearer ${token}`,
                      email: user.email,
                  },
              });

              if (res.data?.role) {
                  localStorage.setItem("role", res.data.role);
                  return res.data.role;
              } else {
                  logoutUser();
                  navigate("/login");
                  return "guest"; // Fallback role
              }
          } catch (error) {
              if (error.response?.status === 401 || error.response?.status === 403) {
                  logoutUser();
                  toast.error(error.response?.data?.message || "Unauthorized access.");
                  navigate("/login");
              }
              throw error; // Let React Query handle the error
          }
        }


    };

    const { isLoading: loading, data: role = "guest", refetch, isError, error } = useQuery(
        ["userRole", user?.email], 
        fetchUserRole,
        {
            enabled: shouldFetch, // Prevent fetching when user is still loading
            retry: false, // Avoid retrying if unauthorized
            onError: (error) => {
                console.error("Error fetching user role:", error);
            },
        }
    );

    return { loading, role, refetch, isError, error };
};

export default useGetUserRole;
