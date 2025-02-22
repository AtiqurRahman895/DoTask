import { useState, useContext } from "react";
import useSecureAxios from "../../Hooks/useSecureAxios";
import TitleSection from "../CommonComponent/TitleSection";
import AddTaskModal from "./AddTaskModal";
import { TransferLists } from "../../Contexts/TransferLists";
import TaskStatusBar from "./TaskStatusBar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Home = () => {
  const secureAxios = useSecureAxios();
  const { taskStatusList } = useContext(TransferLists);
  const queryClient = useQueryClient();
  const [activeTask, setActiveTask] = useState(null); // Store dragged task

  const changeTaskStatusMutation = useMutation({
    mutationFn: async ({ _id, status }) => {
      const credentials = { status };
      await secureAxios.put(`/updateTask/${_id}`, credentials);
    },
    onSuccess: (_,{ status }) => {
      queryClient.invalidateQueries(["tasks", status]); 
    },
    onError: (error) => {
      console.error("Failed to update task status!", error);
      toast.error("Failed to update task status!");
    },
  });

  const handleDragStart = (event) => {
    setActiveTask(event.active.data.current.task);

  };

  const handleDragEndEvent = (e) => {
    const { active, over } = e;
    if (!over) {
      setActiveTask(null);
      return
    };

    const _id = active.id;
    const status = over.id;

    if(status!==activeTask.status){
      changeTaskStatusMutation.mutate({ _id, status });

    }
    setActiveTask(null);
  };

  return (
    <main className="space-y-14 pt-28 pb-12 min-h-lvh">
      <TitleSection title="Home" />
      <section>
        <div className="container space-y-10">
          <div className="sectionHeaderWidth text-center">
            <AddTaskModal />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEndEvent}>
              {taskStatusList?.map((taskStatus, index) => (
                <TaskStatusBar key={index} taskStatus={taskStatus} activeTask={activeTask} />
              ))}

              <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} /> : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
