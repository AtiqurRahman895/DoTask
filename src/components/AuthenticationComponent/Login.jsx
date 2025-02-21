// import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import googleSVG from "../../assets/google.svg";
import { normalAxios } from "../../Hooks/useNormalAxios";
import { useNavigate } from "react-router";
// import PropTypes from 'prop-types';

const Login = () => {
  const { loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLoginBtn = async () => {
    try {
      let result = await loginWithGoogle();
      // setUser(result.user)
        await normalAxios.post("/addUser", {
        image:result.user.photoURL,
        name:result.user.displayName,
        email: result.user.email,
        role: "user",
      });
      navigate("/");
      toast.success(`Login successful! Welcome, ${result.user.displayName}!`);
    } catch (error) {
      toast.error(error.message ? error.message : error.code);
    }
  };

  
  return (
    <section className="min-h-lvh" style={{backgroundColor: `var(--color-custom-primary)`, backgroundImage:`url(https://www.transparenttextures.com/patterns/batthern.png)`}}>
      <div className="container hero flex items-center justify-center">
        <div className="h-lvh">

          <div className="sectionHeaderWidth text-center h-[100%] flex flex-col justify-center items-center gap-2 text-white">
            <h1 className="">Organize & Achieve with DoTask</h1>
            <h6 className="sectionHeaderSubtextWidth md:w-[90%]">Simplify your daily tasks, set priorities, and boost your productivity—one task at a time 🚀 </h6>
            <button
              onClick={handleGoogleLoginBtn}
              className="btn bg-white hover:bg-custom-primary border border-white text-black hover:text-white mt-8"
            >
              <img src={googleSVG} alt="" className="w-[1rem]" />
              Login with Google
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

// Login.propTypes = {

// };

export default Login;
