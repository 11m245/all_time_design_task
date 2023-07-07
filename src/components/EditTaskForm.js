import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

export function EditTaskForm({
  users,
  task,
  isEdit,
  setIsEdit,
  getTasks,
  setGetTasks,
}) {
  const { assigned_user, task_date, task_time, task_msg } = task;

  const [assUser, setAssUser] = useState(assigned_user);
  const get24hrString = (seconds) => {
    const hr = parseInt(seconds / 3600);
    const min = parseInt((seconds - hr * 3600) / 60);
    return `${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  };
  const initialValues = {
    tdes: task_msg,
    date: task_date,
    time: get24hrString(task_time),
    a_user: assigned_user,
  };

  const validationSchema = yup.object({
    tdes: yup.string().required("Required"),
    date: yup.string().required("Required"),
    time: yup.string().required("Required"),
    a_user: yup.string(),
  });

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      // console.log("edit form values", values);
      editExistingTask(values, task);
    },
  });
  const setSeconds = (str) => {
    const [hour, min] = str.split(":");
    return parseInt(hour) * 60 * 60 + parseInt(min) * 60;
  };
  const editExistingTask = async (values, task) => {
    const formattedEditTaskData = {
      assigned_user: assUser,
      task_date: values.date,
      task_time: setSeconds(values.time),
      is_completed: task.is_completed,
      time_zone: 19800,
      task_msg: values.tdes,
    };
    // console.log("edit task submission", formattedEditTaskData);
    const editTaskUrl = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${task.id}?company_id=${task.company_id}`;
    const editTaskResponse = await fetch(editTaskUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formattedEditTaskData),
    });
    // console.log("edit res", editTaskResponse);
    if (editTaskResponse.status === 200) {
      const data = await editTaskResponse.json();
      // console.log("task edited", data);
      setGetTasks(!getTasks);
      // setShow("taskSummary");
      setIsEdit(false);
    } else {
      const data = await editTaskResponse.json();
      // console.log("not edited task", data);
      alert("cant edit new task");
    }
  };

  const handleSelectChange = (e) => {
    values.a_user = e.target.value;
    setAssUser(e.target.value);
    // console.log("selected user val is", e.target.value);
    // console.log("select val is", values.a_user);
  };

  const handleDeleteTask = async (task) => {
    // console.log("delete task is", task);
    const deleteTaskUrl = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${task.id}?company_id=${task.company_id}`;
    const deleteTaskResponse = await fetch(deleteTaskUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("delete res", deleteTaskResponse);
    if (deleteTaskResponse.status === 200) {
      const data = await deleteTaskResponse.json();
      // console.log("task deleteed", data);
      setGetTasks(!getTasks);
      // setShow("taskSummary");
    } else {
      const data = await deleteTaskResponse.json();
      // console.log("not deleteed task", data);
      alert("cant delete task");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-field-wrapper">
          <label htmlFor="tdes">Task Description</label>
          <input
            required
            id="tdes"
            type="text"
            name="tdes"
            onChange={handleChange}
            value={values.tdes}
          ></input>
        </div>
        <div className="inline-field-wrapper">
          <div className="input-field-wrapper">
            <label htmlFor="date" style={{ fontWeight: 600, gap: "6px" }}>
              Date
            </label>
            <input
              required
              id="date"
              type="date"
              name="date"
              onChange={handleChange}
              value={values.date}
            ></input>
          </div>
          <div className="input-field-wrapper">
            <label htmlFor="time" style={{ fontWeight: 600, gap: "6px" }}>
              Time
            </label>
            <input
              required
              id="time"
              type="time"
              name="time"
              onChange={handleChange}
              value={values.time}
            ></input>
          </div>
        </div>
        <div className="input-field-wrapper">
          <label htmlFor="a_user">Assign User</label>
          <select
            name="a_user"
            id="a_user"
            onChange={handleSelectChange}
            value={assUser}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons-container">
          <div className="left">
            <button
              type="button"
              className="delete-button"
              onClick={() => handleDeleteTask(task)}
            >
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
                    d="M12.6667 2.66667H10.3333L9.66668 2H6.33334L5.66668 2.66667H3.33334V4H12.6667M4.00001 12.6667C4.00001 13.0203 4.14049 13.3594 4.39053 13.6095C4.64058 13.8595 4.97972 14 5.33334 14H10.6667C11.0203 14 11.3594 13.8595 11.6095 13.6095C11.8595 13.3594 12 13.0203 12 12.6667V4.66667H4.00001V12.6667Z"
                    fill="#999999"
                  />
                </g>
              </svg>
            </button>
          </div>

          <div className="right">
            <button
              className="cancel-button"
              type="button"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
            <input className="save-button" type="submit" value="Save" />
          </div>
        </div>
      </form>
    </>
  );
}
