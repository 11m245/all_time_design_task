import { useFormik } from "formik";
import * as yup from "yup";
import { CustomDate } from "./Date/customDate";
import { Time } from "./Time/Time";
import { useContext } from "react";
import { AllTimeContext } from "../App";
import { CustomSelect } from "./CustomSelect/CustomSelect";

export function AddTaskForm({
  addTasks,
  setAddTasks,
  formNo,
  setShow,
  users,
  getTasks,
  setGetTasks,
}) {
  const initialValues = { tdes: "Follow up", date: "", time: "", a_user: "" };
  // const [assUser, setAssUser] = useState("");
  const validationSchema = yup.object({
    tdes: yup.string().required("Required"),
    date: yup.string().required("Required"),
    time: yup.string().required("Required"),
    a_user: yup.string().required("Required"),
  });

  const { handleChange, handleSubmit, values, setFieldValue, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async () => {
        // console.log("time", values.time);
        // values.time = setSeconds(values.time);
        // console.log("add task form values", values);
        await addNewTask(values);
        deleteAfterUpdate(formNo);
      },
    });

  const deleteAfterUpdate = (formNo) => {
    setAddTasks(addTasks.filter((task) => formNo !== task.formNo));
  };
  const addNewTask = async (values) => {
    // console.log("new task submission", values);
    const formattedNewTaskData = {
      assigned_user: values.a_user,
      task_date: values.date,
      task_time: parseInt(values.time),
      is_completed: 0,
      time_zone: 19800,
      task_msg: values.tdes,
    };
    const addTaskUrl = `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${localStorage.getItem(
      "company_id"
    )}`;
    const addTaskResponse = await fetch(addTaskUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formattedNewTaskData),
    });
    // console.log("add res", addTaskResponse);
    if (addTaskResponse.status === 200) {
      const data = await addTaskResponse.json();
      // console.log("task added", data);
      setGetTasks(!getTasks);
      setShow("taskSummary");
    } else {
      const data = await addTaskResponse.json();
      // console.log("not added task", data);
      alert("cant add new task");
    }
  };

  // const setSeconds = (str) => {
  //   const [hour, min] = str.split(":");
  //   return parseInt(hour) * 60 * 60 + parseInt(min) * 60;
  // };

  const handleSelectChange = (e) => {
    // values.a_user = e.target.value;
    // setAssUser(e.target.value);
    // console.log("selected user val is", e.target.value);
    setFieldValue("a_user", e.target.value);
  };
  const strWithZero = (num) => {
    const str = String(num);
    if (str.length < 2) {
      return str.padStart(2, "0");
    } else {
      return str;
    }
  };
  const handleDateChange = (e, year, month) => {
    // console.log("onchange in custom component prop", e, year, month);
    // console.log("date change from cust dt", year, month, e.target.innerText);
    // setSelectedDate(new Date(year, month, e.target.innerText));

    setFieldValue(
      "date",
      `${year}-${strWithZero(month + 1)}-${strWithZero(e.target.innerText)}`
    );
  };

  const handleTimeChange = (vv) => {
    // console.log("handle time change", vv);
    setFieldValue("time", vv);
  };

  const handleUserOption = (optionValue) => {
    const clickedUser = users.find((user) => user.name === optionValue);
    setFieldValue("a_user", clickedUser.id);
    // setActivePopUp(null);
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
            {/* <input
              required
              id="date"
              type="date"
              name="date"
              onChange={handleChange}
              value={values.date}
              // value={"2023-07-10"}
            ></input> */}

            <CustomDate
              id="date"
              type="date"
              name="date"
              value={values.date}
              onChange={handleDateChange}
            />
          </div>
          <div className="input-field-wrapper">
            <label htmlFor="time" style={{ fontWeight: 600, gap: "6px" }}>
              Time
            </label>
            {/* <input
              required
              id="time"
              type="time"
              name="time"
              onChange={handleChange}
              value={values.time}
            ></input> */}
            <Time
              id="time"
              type="time"
              name="time"
              value={values.time}
              onChange={handleTimeChange}
            />
          </div>
        </div>
        <div className="input-field-wrapper">
          <label htmlFor="a_user">Assign User</label>
          {/* <select
            name="a_user"
            id="a_user"
            onClick={() => setActivePopUp("user")}
            onChange={handleSelectChange}
            value={values.a_user}
            // value={values.a_user}
            required
          >
            <option key={"keyBlank"} value={""}></option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select> */}

          <CustomSelect
            required={true}
            name={"a_user"}
            id={"a_user"}
            value={values.a_user}
            options={users}
            onOptionChange={handleUserOption}
          />

          <p>
            {" "}
            {touched.a_user && errors.a_user
              ? `user is ${errors.a_user}`
              : null}
          </p>
        </div>
        <div className="buttons-container">
          <button
            className="cancel-button"
            type="button"
            onClick={() => {
              setShow("taskSummary");
              deleteAfterUpdate(formNo);
            }}
          >
            Cancel
          </button>
          <input className="save-button" type="submit" value="Save" />
        </div>
      </form>
    </>
  );
}
