import { createContext, useEffect, useState } from "react";
import "./App.css";
import { TaskSummary } from "./components/TaskSummary";
import { AddTask } from "./components/AddTask";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [getTasks, setGetTasks] = useState(false);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState("taskSummary");
  const [tasks, setTasks] = useState([]);
  const [addTasks, setAddTasks] = useState([]);

  const handleAddTask = () => {
    if (addTasks.length === 0) {
      setAddTasks([...addTasks, { formNo: 0 }]);
    } else {
      setAddTasks([
        ...addTasks,
        { formNo: addTasks[addTasks.length - 1]["formNo"] + 1 },
      ]);
    }
  };
  const handleLogin = async () => {
    const login_url = "https://stage.api.sloovi.com/login?product=outreach";
    const credentials = {
      email: "smithwills1989@gmail.com",
      password: "12345678",
    };
    const loginResponse = await fetch(login_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (loginResponse.status === 200) {
      const data = await loginResponse.json();
      localStorage.setItem("token", data.results.token);
      localStorage.setItem("company_id", data.results.company_id);
      localStorage.setItem("user_id", data.results.user_id);
      setIsLoggedIn(true);
    } else {
      alert("unable to login");
    }
  };

  const fetchUsers = async () => {
    const fetch_users_url = `https://stage.api.sloovi.com/team?product=outreach&company_id=${localStorage.getItem(
      "company_id"
    )}`;

    const usersResponse = await fetch(fetch_users_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (usersResponse.status === 200) {
      const data = await usersResponse.json();
      setUsers(data.results.data);
      // console.log("users data", data.results.data);
    } else {
      alert("unable to fetch users");
    }
  };
  const fetchTasks = async () => {
    const fetch_tasks_url = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${localStorage.getItem(
      "company_id"
    )}`;

    const tasksResponse = await fetch(fetch_tasks_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (tasksResponse.status === 200) {
      const data = await tasksResponse.json();
      setTasks(data.results);
      // console.log("tasks data", data.results);
    } else {
      alert("unable to fetch tasks");
    }
  };

  useEffect(() => {
    handleLogin();
    return () => {
      localStorage.removeItem("token");
      localStorage.removeItem("company_id");
      localStorage.removeItem("user_id");
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn, getTasks]);

  return (
    <div className="App">
      <aside></aside>
      <main>
        <header></header>
        {/* <p>selected date is {selectedDate?.toDateString()}</p> */}
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
        {/* <CustomDate selectedDate={selectedDate} onDateChange={onDateChange} /> */}

        <section className="tasks-header">
          <div className="header-left">
            <p className="title"> TASKS</p>
            <p className="count">{tasks.length}</p>
          </div>
          <button className="add-icon tooltip" onClick={handleAddTask}>
            <span>New Task</span>
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
          {addTasks.length > 0
            ? addTasks.map((val, i) => (
                <AddTask
                  addTasks={addTasks}
                  setAddTasks={setAddTasks}
                  key={i}
                  formNo={val.formNo}
                  setShow={setShow}
                  users={users}
                  getTasks={getTasks}
                  setGetTasks={setGetTasks}
                />
              ))
            : null}
          {tasks.length > 0
            ? tasks.map((task) => (
                <TaskSummary
                  users={users}
                  key={task.id}
                  task={task}
                  getTasks={getTasks}
                  setGetTasks={setGetTasks}
                />
              ))
            : null}
        </section>
      </main>
    </div>
  );
}

export default App;
