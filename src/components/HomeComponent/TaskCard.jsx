import { RiDeleteBin2Fill } from "react-icons/ri";
import UpdateTaskModal from "./UpdateTaskModal";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";
import useConvertTo12HourFormat from "../../Hooks/useConvertTo12HourFormat";
import { useState } from "react";

const TaskCard = ({ task, refetch }) => {
  const secureAxios = useSecureAxios();
  const convertTo12HourFormat = useConvertTo12HourFormat();
  const [openModal, setOpenModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: { task },
  });

  const { formattedTime, dateFormatted } = convertTo12HourFormat(task?.lastUpdate);

  const handleDeleteButton = async (_id) => {
    const deleteTask = window.confirm(`Are you sure you want to delete this task?`);
    if (deleteTask) {
      try {
        await secureAxios.delete(`/tasks/${_id}`);
        refetch();
        toast.info(`Task successfully deleted`);
      } catch (error) {
        toast.error(`Failed to delete task`);
        console.error(error);
      }
    }
  };

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-3 space-y-1 rounded-sm bg-white dark:bg-black relative cursor-grab active:cursor-grabbing ${openModal ? "!z-[23]" : "!z-[20]"}`}
      style={style}
    >
      <div className="space-x-3 w-fit float-end">
        <UpdateTaskModal task={task} refetch={refetch} openModal={openModal} setOpenModal={setOpenModal} />
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            handleDeleteButton(task._id);
          }}
          className="outlineButton activeOutlineButton !px-1 !py-1"
        >
          <RiDeleteBin2Fill className="text-lg" />
        </button>
      </div>

      <div
        {...listeners}
        {...attributes}
        className="space-y-3 pt-10 cursor-grab active:cursor-grabbing"
        onTouchStart={listeners.onStart}
        onTouchMove={listeners.onMove}
        onTouchEnd={listeners.onEnd}
      >
        <div>
          <h6>{task.taskTitle}</h6>
          <p>{task.taskDetails}</p>
        </div>

        {/* Timestamp */}
        <div className="grid [&_*]:!text-xs justify-items-center">
          <b>Last Updated at</b>
          <p>{formattedTime}, {dateFormatted}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

