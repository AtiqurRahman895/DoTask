
const TaskTitleInput = ({taskTitle, setTaskTitle }) => {

    return (
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
    );
};

export default TaskTitleInput;