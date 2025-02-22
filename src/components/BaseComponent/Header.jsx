// import PropTypes from 'prop-types';

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link, useLocation } from "react-router";
// import { GoUnverified } from "react-icons/go";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [path]); // Trigger when the route changes

  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef(null);
  const { user, logoutUser, verifyAccount } = useContext(AuthContext);

  useEffect(() => {
    const changeHeaderColor = () => {
      setScrollY(window.scrollY);
      if (window.scrollY >= 16) {
        document;
        headerRef.current?.classList.add(`navbarAnimation`);
      } else {
        document;
        headerRef.current?.classList.remove(`navbarAnimation`);
      }
    };

    window.addEventListener(`scroll`, changeHeaderColor);
  }, []);

  // useEffect(() => {
  //   if(path==="/" || path==="/faq" || path==="/tutors" || path==="/all_sessions"){
  //     headerRef.current?.classList.add(`fixed`);
  //   }else {
  //     headerRef.current?.classList.add(`sticky`);
  //     if(path.includes("/session")){
  //       headerRef.current?.classList.add(`bg-[#1c0f2366]`);
  //     }
  //   }
  // }, [headerRef,path]); 

  // console.log(location.pathname)

  return (
    <header
      ref={headerRef}
      className={`fixed text-white top-0 z-50 w-full`}
    >
      <div className={`navbar container`}>
        <div className="navbar-start gap-x-4">

          <Link
            to={"/"}
            className={`flex items-center gap-1 font-family-fugaz !text-3xl ${path==="/login"?"text-white hover:!text-white":"text-custom-primary hover:!text-custom-primary"} uppercase`}
          >
            <img src={"https://i.ibb.co.com/nQ396hD/study-only-logo.png"} alt="logo" className="w-[45px] hidden lg:block"/>
            Do Task
          </Link>
        </div>


        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-end dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="indicator hover:shadow-xl sm:mx-4"
                >
                  <div className="w-10 aspect-square rounded-full overflow-hidden bg-white">
                    <img
                      alt="User Photo"
                      // className="place-self-start"
                      src={
                        user.photoURL
                          ? `${user.photoURL}`
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                  {user.emailVerified && (
                    <RiVerifiedBadgeFill className="text-sky-500 text-[16px] indicator-item top-2 right-0" />
                  )}
                </div>
                <div className="dropdown-content bg-white rounded-box z-[1] min-w-52 p-2 shadow space-y-2">
                  <div className="space-y-1 text-center w-full">
                    {user.displayName && (
                      <div className="flex justify-center text-black">
                        <h5 className="font-bold">{user.displayName}</h5>
                        {/* {user.emailVerified?<RiVerifiedBadgeFill className="text-sky-500" />:<RiVerifiedBadgeFill className="text-red-500" />} */}
                        {/* {user.emailVerified && <RiVerifiedBadgeFill className="text-sky-400" />} */}
                      </div>
                    )}

                    <p className="text-custom-primary font-bold">
                      {user.email && user.email}
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm text-black !list-none !space-y-1 !m-0 w-full"
                  >
                    {/* {user.emailVerified || (
                      <li className="hover:scale-105 duration-200">
                        <p
                          onClick={verifyAccount}
                          className="font-bold text-black"
                        >
                          {" "}
                          Verify now{" "}
                        </p>
                      </li>
                    )} */}

                    <li>
                      <Link to={"/update-profile"} className="hover:bg-custom-metalic-gray rounded-md">
                        Update Profile
                      </Link>
                    </li>
                    {/* <li>
                      <Link to={"/change-password"} className="hover:bg-custom-metalic-gray rounded-md">
                        Change Password
                      </Link>
                    </li> */}
                    <li className="hover:scale-105 duration-400 sm:hidden hover:bg-custom-metalic-gray rounded-md">
                      <p onClick={logoutUser}>Log Out</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                onClick={logoutUser}
                className={`primaryButton hover:scale-105 hidden sm:inline-block ${path==="/login"&&"!border-white"}`} 
              >
                Log Out
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/login"}
                className={`primaryButton hover:scale-105`}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className={`hidden sm:inline-block primaryButton hover:scale-105`}
              >
                Registration
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// Footer.propTypes = {

// };

export default Header;
