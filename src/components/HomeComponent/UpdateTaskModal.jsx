import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import TaskTitleInput from "./TaskTitleInput";
import TaskDetailsInput from "./TaskDetailsInput";
import { MdEditSquare } from "react-icons/md";

const UpdateTaskModal = ({task, refetch}) => {
  const secureAxios = useSecureAxios();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(()=>{
    setTaskTitle(task?.taskTitle)
    setTaskDetails(task?.taskDetails)
  },[task])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskDetails_word_count = taskDetails
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/).length;

    if (taskDetails_word_count < 5) {
      toast.warning(
        `Please lenghten task details to 5 or more word! (Currently has ${taskDetails_word_count} words)`
      );
      return;
    }
    const credentials = { taskTitle, taskDetails, lastUpdate:task.lastUpdate };

    try {
        await secureAxios.put(`/updateTask/${task?._id}`, credentials)
        toast.success("Successfully updated this task!");
        setTaskTitle("")
        setTaskDetails("")
        setOpenModal(false);
        refetch()

        console.log(task)
    } catch (error) {
        console.error("Failed to update this task!", error);
        toast.error("Failed to update this task!");
    }

    
  };

  return (
    <>

      <button onClick={() => setOpenModal(true)} className="outlineButton activeOutlineButton !px-1 !py-1" >
            <MdEditSquare className="text-lg"/>
      </button>
      <dialog id="reject_modal" className="!m-0 modal bg-[rgba(0,0,0,.4)]" open={openModal} >

          <div className="modal-box bg-black max-w-md pt-10">
              <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle bg-custom-primary absolute right-3 top-3"
              >
              ✕
              </button>
              <form onSubmit={handleSubmit} className="space-y-3">
              
              <h3 className="text-white !text-4xl">Update this task</h3>

              <TaskTitleInput taskTitle={taskTitle} setTaskTitle={setTaskTitle}/>
              <TaskDetailsInput taskDetails={taskDetails} setTaskDetails={setTaskDetails}/>

              <div className="flex pt-4">
                  <button
                  type="submit"
                  className="primaryButton activePrimaryButton mx-auto"
                  >
                  Confirm
                  </button>
              </div>
              </form>
          </div>

      </dialog>
    </>
  );
};

export default UpdateTaskModal;
