import { RiDeleteBin2Fill } from "react-icons/ri";
import UpdateTaskModal from "./UpdateTaskModal";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { toast } from "react-toastify";

const TaskCard = ({task,refetch}) => {
    const secureAxios = useSecureAxios();

    const handleDeleteButton = async (_id) => {
        const deleteNote = window.confirm(`Are you sure about deleting this task?`);
        if (deleteNote) {
          try {
            await secureAxios.delete(`/deleleTask/${_id}`);
            refetch();
            toast.info(`You have successfully deleted one task`);
          } catch (error) {
            toast.error(`Failed to delete one task`);
            console.error(error);
          }
        }
      };
      
    return (
        <div className="p-3 space-y-1 rounded-sm bg-white dark:bg-black">
            <div className="flex gap-4 justify-end pb-1">
                <UpdateTaskModal task={task} refetch={refetch} />

                <button onClick={()=>handleDeleteButton(task._id)} className="outlineButton activeOutlineButton !px-1 !py-1" >
                    <RiDeleteBin2Fill className="text-lg"/>
                </button>
            </div>

            <h6>{task.taskTitle}</h6>
            <p>{task.taskDetails}</p>

        </div>
    );
};

export default TaskCard;