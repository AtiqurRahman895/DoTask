import { MdDeleteForever, MdEdit, MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskCard = ({task,refetch}) => {

    return (
        <div className="p-3 space-y-1 rounded-sm bg-white dark:bg-black">
            <div className="flex gap-4 justify-end pb-1">
                <UpdateTaskModal task={task} refetch={refetch} />
                <button className="outlineButton activeOutlineButton !px-1 !py-1" >
                    <RiDeleteBin2Fill className="text-lg"/>
                </button>
            </div>

            <h6>{task.taskTitle}</h6>
            <p>{task.taskDetails}</p>

        </div>
    );
};

export default TaskCard;