import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../Hooks/useSecureAxios";
import Loading from "../AuthenticationComponent/Loading";
import TaskCard from "./TaskCard";

const TaskStatusBar = ({taskStatus}) => {
  const secureAxios = useSecureAxios();
  const {_id, statusName}= taskStatus

  const fetchTasks = async () => {
    // console.log(statusName)
    const res = await secureAxios.get("/tasks",{
        params: { status: statusName },
      });
    return res.data;
  };
  const {isLoading: loading,data: tasks = [],refetch,isError,error,} = useQuery({
    queryKey: ["tasks", statusName], 
    queryFn: fetchTasks,
    enabled: !!statusName,
  });

  if (isError) {
    console.error(error);
    // throw error;
  }

  return (
        <div className="hide-scrollbar bg-custom-metalic-gray rounded-md h-[600px] overflow-y-auto relative">
            <div className="bg-custom-primary text-white p-4 uppercase text-center sticky top-0 backdrop-brightness-50">
                <h5>{statusName}</h5>
            </div>
            <div className="p-4 space-y-4">
                {
                    loading?<span className="loading loading-spinner loading-xl py-10 block mx-auto text-custom-primary"></span>:
                    <>
                    {
                        tasks.map((task,index)=>(
                            <TaskCard key={index} task={task} refetch={refetch} />
                        ))
                    }
                    </>
                    
                }
            </div>
        </div>
    );
};

export default TaskStatusBar;