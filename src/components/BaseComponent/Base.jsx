import Header from "./Header";
import { TransferLists } from "../../Contexts/TransferLists";
import ThemeToggler from "../CommonComponent/ThemeToggler";
import { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Base = () => {
  const [lightTheme, setLightTheme]=useState(false)
  const {user,loading}= useContext(AuthContext)

  const location = useLocation();
  const path = location.pathname;


  const value = {
    lightTheme, setLightTheme,
  };

  return (
    <>
      <TransferLists.Provider value={value}>
        {
          (!loading && user) &&(
            <Header />
          )
        }
          
          <Outlet />          
          {/* <Footer /> */}
          <section className="fixed bottom-[10%] right-4 z-50">
            <ThemeToggler/>
          </section>
      </TransferLists.Provider>
    </>
  );
};

// Base.propTypes = {

// };

export default Base;
