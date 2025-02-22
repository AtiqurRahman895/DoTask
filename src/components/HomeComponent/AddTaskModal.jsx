import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useSecureAxios from "../../Hooks/useSecureAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskTitleInput from "./TaskTitleInput";
import TaskDetailsInput from "./TaskDetailsInput";
// import TaskModal from "./TaskModal";

const AddTaskModal = () => {
  const { user } = useContext(AuthContext);
  const secureAxios = useSecureAxios();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async (credentials) => {
      await secureAxios.post(`/addTask`, credentials)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", "to-do"]); // Invalidate only the specific status
      toast.success("Successfully added a new task!");
      setTaskTitle("")
      setTaskDetails("")
      setOpenModal(false);
    },
    onError:(error)=>{
      console.error("Failed to add new task!", error);
      toast.error("Failed to add new task!");
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskDetails_word_count = taskDetails
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/).length;

    if (taskDetails_word_count < 5 || taskDetails_word_count > 50) {
      toast.warning(
        `Please expand the task details to between 5 and 50 words! (Currently has ${taskDetails_word_count} words)`
      );
      return;
    }
    const credentials = { email: user.email, taskTitle, taskDetails };

    addTaskMutation.mutate(credentials)
  };

  return (
    // <TaskModal modalText="Add a new Task" openModal={openModal} setOpenModal={setOpenModal} handleSubmit={handleSubmit} taskTitle={taskTitle} setTaskTitle={setTaskTitle} taskDetails={taskDetails} setTaskDetails={setTaskDetails} />
    <>
      <button
        className={`primaryButton`}
        onClick={() => setOpenModal(true)}
        >
        Add New
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
              
              <h3 className="text-white !text-4xl">Add a new task</h3>

              <TaskTitleInput taskTitle={taskTitle} setTaskTitle={setTaskTitle} />
              <TaskDetailsInput taskDetails={taskDetails} setTaskDetails={setTaskDetails} />

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

export default AddTaskModal;
