import { useEffect, useState } from "react";
import { TbAdjustmentsFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import UseUrlQuery from "../../Hooks/UseUrlQuery";

const AllUsersTopScrollBar = ({ userCount=0 }) => {
  const {searchQuery} = UseUrlQuery();
  const navigate =useNavigate()
  const [roleList, setRoleList] = useState([]);
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    let allRoleList=[ "All", "Student", "Tutor", "Admin"]
      
    const remainingRole = allRoleList.filter(
      (roleName) => roleName !== searchQuery
    );
    const selectedRole = allRoleList.filter(
      (roleName) => roleName == searchQuery
    );

    setRoleList(remainingRole);
    setUserRole(selectedRole);

    return

  }, [searchQuery]);

  const handleSearchInput = (e) => {
    e.preventDefault();
    navigate(`?searchQuery=${e.target.searchInput.value}`);
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearchInput} className="flex justify-center">

        <label
          className="input input-ghost !text-custom-primary border-custom-primary 
           focus:border-custom-primary input-bordered flex items-center gap-2"
        >
          <input
            type="search"
            name="searchInput"
            id="searchInput"
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>

      <div className="flex justify-center">
        <div className="flex gap-2 items-center overflow-x-scroll hide-scrollbar rounded-md">
          <button
            tabIndex={0}
            type="button"
            className="flex items-center gap-1 primaryButton capitalize"
          >
            <TbAdjustmentsFilled className="text-[18px]" />
            Filter: {searchQuery === "All" ? "All" : userRole}
          </button>
          <div className="flex gap-2">
            {roleList.map((roleName, index) => (
              <button
                key={index}
                onClick={() => navigate(`?searchQuery=${roleName}`)}
                className={`bg-custom-gray hover:bg-custom-gray hover:scale-105 text-sm text-black cursor-pointer px-4 py-[.56rem] duration-500 rounded-md border-none flex-shrink-0`}
              >
                {roleName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* <h6 className="text-custom-primary">
        {searchQuery === "All"
          ? `All sessions(${userCount})`
          : `Result for ${searchQuery}(${userCount})`}
      </h6> */}
    </div>
  );
};

export default AllUsersTopScrollBar;
