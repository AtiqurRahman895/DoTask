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
    const deleteTask = window.confirm(`Are you sure about deleting this task?`);
    if (deleteTask) {
      try {
        await secureAxios.delete(`/tasks/${_id}`);
        refetch();
        toast.info(`You have successfully deleted one task`);
      } catch (error) {
        toast.error(`Failed to delete one task`);
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
      className={`p-3 space-y-1 rounded-sm bg-white dark:bg-black relative cursor-grab active:cursor-grabbing ${openModal?"!z-[23]":"!z-[20]"} `}
      style={style}
    >
      {/* Buttons (clickable, but not draggable) */}
      <div className="space-x-3 w-fit float-end">
        <UpdateTaskModal task={task} refetch={refetch} openModal={openModal} setOpenModal={setOpenModal}/>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent dragging when clicking button
            handleDeleteButton(task._id);
          }}
          className="outlineButton activeOutlineButton !px-1 !py-1"
        >
          <RiDeleteBin2Fill className="text-lg" />
        </button>
      </div>

      {/* Drag Handle (only this div will be draggable) */}
      <div {...listeners} {...attributes} className="space-y-3 pt-10 cursor-grab active:cursor-grabbing ">
            <div className="">
                <h6>{task.taskTitle}</h6>
                <p>{task.taskDetails}</p>
            </div>

            {/* Timestamp */}
            <div className="grid [&_*]:!text-xs justify-items-center">
                <b className="">Last Updated at</b>
                <p className="">
                    {formattedTime}, {dateFormatted}
                </p>
            </div>
      </div>

    </div>
  );
};

export default TaskCard;
