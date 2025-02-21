
const TaskDetailsInput = ({taskDetails, setTaskDetails}) => {
    return (
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
    );
};

export default TaskDetailsInput;