import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../Hooks/useSecureAxios";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const TaskStatusBar = ({ taskStatus, activeTask }) => {
  const secureAxios = useSecureAxios();
  const { statusName } = taskStatus;

  const { setNodeRef } = useDroppable({ id: statusName });

  const fetchTasks = async () => {
    const res = await secureAxios.get("/tasks", {
      params: { status: statusName },
    });
    return res.data;
  };

  const { isLoading, data: tasks = [], refetch, isError, error } = useQuery({
    queryKey: ["tasks", statusName],
    queryFn: fetchTasks,
    enabled: !!statusName,
  });

  if (isError) {
    console.error(error);
  }

  return (
    <div ref={setNodeRef} className="bg-[rgba(63,76,132,0.4)] rounded-md h-[600px] overflow-y-auto hide-scrollbar">
      <div className="bg-custom-primary text-white p-4 uppercase text-center sticky top-0 backdrop-brightness-50 !z-[22]">
        <h5>{statusName}</h5>
      </div>

      <div className="p-4 space-y-4">
        {isLoading ? (
          <span className="loading loading-spinner loading-xl py-10 block mx-auto text-custom-primary"></span>
        ) : (
          <>
            {tasks
              .filter((task) => task._id !== activeTask?._id)
              .map((task) => (
                <TaskCard key={task._id} task={task} refetch={refetch} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskStatusBar;
