import { AddTaskForm } from "./AddTaskForm";

function AddTask({
  formNo,
  setShow,
  users,
  getTasks,
  setGetTasks,
  addTasks,
  setAddTasks,
}) {
  return (
    <>
      <div className="add-task-wrapper">
        <AddTaskForm
          addTasks={addTasks}
          setAddTasks={setAddTasks}
          formNo={formNo}
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
