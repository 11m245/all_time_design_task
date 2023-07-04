import { useFormik } from "formik";
import * as yup from "yup";

function AddTask({ setShow }) {
  return (
    <>
      <div className="add-task-wrapper">
        <AddTaskForm setShow={setShow} />
      </div>
    </>
  );
}

function AddTaskForm({ setShow }) {
  const users = [
    { name: "user1", id: 1 },
    { name: "user2", id: 2 },
  ];
  const initialValues = { tdes: "", date: "", time: "", a_user: "" };
  const validationSchema = yup.object({
    tdes: yup.string().required("Required"),
    date: yup.string().required("Required"),
    time: yup.string().required("Required"),
    a_user: yup.string().required("Required"),
  });

  const { handleBlur, handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      console.log("time", values.time);
      values.time = setSeconds(values.time);
      console.log("form values", values);
      setShow("taskSummary");
    },
  });

  const setSeconds = (str) => {
    const [hour, min] = str.split(":");
    return parseInt(hour) * 60 * 60 + parseInt(min) * 60;
  };

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
            onClick={() => setShow("taskSummary")}
          >
            Cancel
          </button>
          <input className="save-button" type="submit" value="Save" />
        </div>
      </form>
    </>
  );
}
export { AddTask };
