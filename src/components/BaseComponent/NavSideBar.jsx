import NavMenus from "./NavMenus";

const NavSideBar = ({ children }) => {
  return (
    <div className="drawer">
      <input id="navSideBar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side z-50">
        <label
          htmlFor="navSideBar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-custom-primary text-white min-h-full w-[70svw] xs:w-80 grid items-center p-4">
          <ul className="menu h-fit">
            <NavMenus />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavSideBar;
