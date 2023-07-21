import { EditTaskForm } from "./EditTaskForm";

function EditTask({ users, task, isEdit, setIsEdit, getTasks, setGetTasks }) {
  return (
    <>
      <div className="edit-task-wrapper">
        <EditTaskForm
          users={users}
          task={task}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          getTasks={getTasks}
          setGetTasks={setGetTasks}
        />
      </div>
    </>
  );
}

export { EditTask };
