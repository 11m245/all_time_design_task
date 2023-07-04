import { useState } from "react";
import "./App.css";
import { TaskSummary } from "./components/TaskSummary";
import { AddTask } from "./components/AddTask";

function App() {
  const [show, setShow] = useState("taskSummary");
  const tasks = [
    {
      id: "id1",
      assigned_user: "user1",
      task_date: "2023-07-04",
      task_time: 79560,
      is_completed: 0,
      time_zone: 19800,
      task_msg: "task description 1",
    },
    {
      id: "id2",
      assigned_user: "user1",
      task_date: "2023-07-03",
      task_time: 78560,
      is_completed: 1,
      time_zone: 19800,
      task_msg: "task description 2",
    },
  ];

  const handleAddTask = () => {
    setShow("addTask");
  };
  return (
    <div className="App">
      <aside></aside>
      <main>
        <header></header>
        <section className="test-section">
          <h1>Test</h1>
          <a
            href="http://www.sloovi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sloovi.com
          </a>
          <p>Add description,</p>
        </section>
        <section className="tasks-header">
          <div className="header-left">
            <p className="title"> TASKS</p>
            <p className="count">{tasks.length}</p>
          </div>
          <button className="add-icon" onClick={handleAddTask}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame">
                <path
                  id="Vector"
                  d="M13 8C13 8.32 12.743 8.577 12.423 8.577H8.577V12.423C8.577 12.576 8.51621 12.7228 8.408 12.831C8.29979 12.9392 8.15303 13 8 13C7.84697 13 7.70021 12.9392 7.592 12.831C7.48379 12.7228 7.423 12.576 7.423 12.423V8.577H3.577C3.42397 8.577 3.27721 8.51621 3.169 8.408C3.06079 8.29979 3 8.15303 3 8C3 7.84697 3.06079 7.70021 3.169 7.592C3.27721 7.48379 3.42397 7.423 3.577 7.423H7.423V3.577C7.423 3.42397 7.48379 3.27721 7.592 3.169C7.70021 3.06079 7.84697 3 8 3C8.15303 3 8.29979 3.06079 8.408 3.169C8.51621 3.27721 8.577 3.42397 8.577 3.577V7.423H12.423C12.743 7.423 13 7.683 13 8Z"
                  fill="#6C6C6D"
                />
              </g>
            </svg>
          </button>
        </section>
        <section className="tasks-body">
          {show === "taskSummary" ? (
            tasks.map((task) => <TaskSummary key={task.id} task={task} />)
          ) : (
            <AddTask setShow={setShow} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
