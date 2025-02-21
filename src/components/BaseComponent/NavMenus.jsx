import { useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { PiListNumbersFill, PiSealQuestionFill } from "react-icons/pi";
import { RiLogoutBoxRFill } from "react-icons/ri";
// import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { GiTeacher } from "react-icons/gi";
import { NavLink, useLocation } from "react-router";

const NavMenus = ({ActiveClass="!font-extrabold !text-black"}) => {
  const location = useLocation();
  const { logoutUser,user } = useContext(AuthContext);
  const path = location.pathname;
  const normalClass = `hover:bg-transparent flex items-center gap-1 pb-1 mb-1`;

  return (
    <>
      <li className="w-fit">
        <NavLink
          to={"/"}
          className={`${path === "/" && ActiveClass} ${normalClass}`}
        >
          <AiFillHome /> Home
        </NavLink>
      </li>

      <li className="w-fit">
        <NavLink
          to={"/all_sessions"}
          className={`${
            path === "/all_sessions" && ActiveClass
          } ${normalClass}`}
        >
          <PiListNumbersFill />
          All Sessions
        </NavLink>
      </li>

      <li className="w-fit">
        <NavLink
          to={"/faq"}
          className={`${
            path === "/faq" && ActiveClass
          } ${normalClass}`}
        >
          <PiSealQuestionFill />
          FAQ
        </NavLink>
      </li>

      <li className="w-fit">
        <NavLink
          to={"/tutors"}
          className={`${
            path === "/tutors" && ActiveClass
          } ${normalClass}`}
        >
          <GiTeacher />
          Tutors
        </NavLink>
      </li>

      {
        (user?.email)&&(
          <li className="w-fit">
            <NavLink
              to={"/dashboard"}
              className={`${path === "/dashboard" && ActiveClass} ${normalClass}`}
            >
              <MdSpaceDashboard />
              Dashboard
            </NavLink>
          </li>
        )
      }


      <li className="w-fit sm:hidden">
        <p onClick={logoutUser} className="flex items-center">
          <RiLogoutBoxRFill />
          Log Out
        </p>
      </li>
    </>
  );
};

export default NavMenus;
