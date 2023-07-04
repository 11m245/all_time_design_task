import { useFormik } from "formik";
import * as yup from "yup";

function EditTask({ task, isEdit, setIsEdit }) {
  const {
    id,
    assigned_user,
    task_date,
    task_time,
    is_completed,
    time_zone,
    task_msg,
  } = task;
  return (
    <>
      <div className="add-task-wrapper">
        <EditTaskForm task={task} isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>
    </>
  );
}

function EditTaskForm({ task, isEdit, setIsEdit }) {
  const {
    assigned_user,
    task_date,
    task_time,
    is_completed,
    time_zone,
    task_msg,
  } = task;
  const users = [
    { name: "user1", id: 1 },
    { name: "user2", id: 2 },
  ];
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
    a_user: yup.string().required("Required"),
  });

  const { handleBlur, handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      console.log("form values", values);
      setIsEdit(false);
    },
  });

  const handleSelectChange = (e) => {
    values.a_user = e.target.value;
    console.log("selected user val is", e.target.value);
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
            value={values.a_user}
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons-container">
          <button
            className="cancel-button"
            type="button"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </button>
          <input className="save-button" type="submit" value="Save" />
        </div>
      </form>
    </>
  );
}
export { EditTask };
