import { AddTaskForm } from "./AddTaskForm";

function AddTask({ setShow, users, getTasks, setGetTasks }) {
  return (
    <>
      <div className="add-task-wrapper">
        <AddTaskForm
          setShow={setShow}
          users={users}
          getTasks={getTasks}
          setGetTasks={setGetTasks}
        />
      </div>
    </>
  );
}

export { AddTask };
