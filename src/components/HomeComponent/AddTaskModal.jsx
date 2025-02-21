import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { secureAxios } from "../../Hooks/useSecureAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const AddTaskModal = ({refetch}) => {
  const { user } = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [openModal, setOpenModal] = useState(false);


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
    const credentials = { email: user.email, taskTitle, taskDetails };

    try {
      await secureAxios.put(`/RejectSession`, credentials);
      toast.success("Successfully added a new task!");
      // refetch();
      setTaskTitle("")
      setTaskDetails("")
      setOpenModal(false);

    } catch (error) {
      console.error("Failed to add new task!", error);
      toast.error("Failed to add new task!");
    }
  };

  return (
    <>
      <button
        className={`primaryButton`}
        onClick={() => setOpenModal(true)}
      >
        Add New
      </button>
      <dialog
        id="reject_modal"
        className="!m-0 modal bg-[rgba(0,0,0,.4)]"
        open={openModal}
      >
        <div className="modal-box bg-black max-w-md pt-10">
          <button
            onClick={() => setOpenModal(false)}
            className="btn btn-sm btn-circle bg-custom-primary absolute right-3 top-3"
          >
            ✕
          </button>
          <form onSubmit={handleSubmit} className="space-y-3">
            <h3 className="text-white !text-4xl">Add a new task</h3>
            <fieldset className="fieldset">
              <label htmlFor="taskTitle" className="fieldset-legend">
                <span className="">Task title</span>
              </label>
              <input
                onChange={(e) => setTaskTitle(e.target.value)}
                value={taskTitle}
                placeholder="Write task title"
                name="taskTitle"
                id="taskTitle"
                className="input customInput w-full"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="taskDetails" className="fieldset-legend">
                <span className="">Task Details</span>
              </label>
              <textarea
                onChange={(e) => setTaskDetails(e.target.value)}
                value={taskDetails}
                placeholder="Write task details"
                name="taskDetails"
                id="taskDetails"
                className="textarea customInput w-full h-32"
                required
              />
            </fieldset>

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
        {/* <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form> */}
      </dialog>
    </>
  );
};

export default AddTaskModal;
