import { useEffect, useState } from "react";
import { TbAdjustmentsFilled, TbArrowsSort } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import UseUrlQuery from "../../Hooks/UseUrlQuery";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

const TopScrollBar = ({ sessionCount, showAllStatusName=false }) => {
  const {sort, searchQuery} = UseUrlQuery();
  const navigate =useNavigate()
  const location = useLocation();
  const path = location.pathname;
  const [statusList, setStatusList] = useState([]);
  const [status, setStatus] = useState([]);
  const [sortTypeList, setSortTypeList] = useState(["None", "High", "Low"]);

  useEffect(() => {
    let allStatusList
    if(showAllStatusName==='all'){
      allStatusList=[ "All", "Upcoming", "Ongoing", "Closed", "Pending", "Rejected"]
    }else if(showAllStatusName==='student'){
      allStatusList=[ "All", "Ongoing", "Closed" ]
    }else{
      allStatusList=[ "All", "Upcoming", "Ongoing", "Closed"]
    }

    const remainingStatus = allStatusList.filter(
      (statusName) => statusName !== searchQuery
    );
    const selectedStatus = allStatusList.filter(
      (statusName) => statusName == searchQuery
    );

    setStatusList(remainingStatus);
    setStatus(selectedStatus);

    return

  }, [searchQuery,showAllStatusName]);

  const handleSearchInput=(e)=>{
    e.preventDefault();
    navigate(`?sort=${sort}&searchQuery=${e.target.searchInput.value}&page=1`);
    e.target.reset();
  }

  const handleSortButton=(sort)=>{
    navigate(`?sort=${sort}&searchQuery=${searchQuery}&page=1`);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearchInput} className="flex justify-center">

        <label
          className="input customInput flex items-center gap-2"
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

      <div className="flex gap-4 w-full items-center justify-center">
        {
          (path==="/all_sessions") && (
            <div className="space-y-3 dropdown dropdown-bottom">

              <button
                tabIndex={0}
                type="button"
                className="flex items-center gap-1 primaryButton !bg-custom-half-primary hover:!bg-custom-primary !text-custom-primary hover:!text-white dark:!text-white"
              >
                {
                  (sort==="None") && (<TbArrowsSort className="text-lg" />)
                }
                {
                  (sort==="High") && (<FaSortAmountUpAlt />)
                }
                {
                  (sort==="Low") && (<FaSortAmountDownAlt />)
                }
                {sort === "None"
                  ? `Sort: ${sort}`
                  : `Price: ${sort}`
                }
    
              </button>
              <div
                tabIndex={0}
                className={`join join-vertical w-40 dropdown-content z-20`}
              >
                {sortTypeList.map((sortTypeName, index) => (
                  <button
                    key={index}
                    onClick={() => handleSortButton(sortTypeName)}
                    className={`${
                      sort === sortTypeName
                        ? "bg-custom-primary hover:bg-custom-primary"
                        : "bg-white hover:bg-custom-gray"
                    } duration-500 btn join-item border border-custom-gray hover:border-custom-gray dark:border-custom-ash dark:hover:border-custom-ash text-black`}
                  >
                    {sortTypeName}
                  </button>
                ))}
              </div>

            </div>
          )
        }


        <div className="flex gap-2 items-center overflow-x-scroll hide-scrollbar rounded-md">
          <button
            tabIndex={0}
            type="button"
            className="flex items-center gap-1 primaryButton capitalize"
          >
            <TbAdjustmentsFilled className="text-[18px]" />
            Filter: {searchQuery === "All" ? "All" : status}
          </button>
          <div className="flex gap-2">
            {statusList.map((statusName, index) => (
              <button
                key={index}
                onClick={() => navigate(`?sort=${sort}&searchQuery=${statusName}&page=1`)}
                className={`bg-custom-gray hover:bg-custom-gray hover:scale-105 text-sm text-black cursor-pointer px-4 py-[.56rem] duration-500 rounded-md border-none flex-shrink-0`}
              >
                {statusName}
              </button>
            ))}
          </div>
        </div>
      </div>

      <h6 className="text-custom-primary">
        {searchQuery === "All"
          ? `All sessions(${sessionCount})`
          : `Result for ${searchQuery}(${sessionCount})`}
      </h6>
    </div>
  );
};

export default TopScrollBar;
