import { useContext } from "react";
import useSecureAxios from "../../Hooks/useSecureAxios";
import TitleSection from "../CommonComponent/TitleSection";
import AddTaskModal from "./AddTaskModal";
import { TransferLists } from "../../Contexts/TransferLists";
import TaskStatusBar from "./taskStatusBar";

const Home = () => {
  const {taskStatusList}=useContext(TransferLists)
  // const secureAxios = useSecureAxios();

  // const fetchNotes = async () => {
  //   const res = await secureAxios.get("/notes");
  //   return res.data;
  // };
  // const {
  //   isLoading: loading,
  //   data: notes = [],
  //   refetch,
  //   isError,
  //   error,
  // } = useQuery(["notes"], fetchNotes);
  
  return (
    <main className="space-y-14 py-12 min-h-lvh">
      <TitleSection title={"Home"} />
      <section className="">
          <div className="container space-y-10">
            <div className="sectionHeaderWidth text-center">
              <AddTaskModal />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    taskStatusList?.map((taskStatus,index)=>(
                        <TaskStatusBar key={index} taskStatus={taskStatus} />
                    ))
                }
            </div>
          </div>
      </section>


    </main>
  );
};

export default Home;
