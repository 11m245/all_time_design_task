import { useState } from "react";
import { EditTask } from "./EditTask";

function TaskSummary({ task, users }) {
  const [isEdit, setIsEdit] = useState(false);
  const {
    id,
    assigned_user,
    task_date,
    task_time,
    is_completed,
    time_zone,
    task_msg,
  } = task;

  const handleEdit = () => {
    setIsEdit(true);
  };
  const markInComplete = () => {
    console.log("incomplete marked", id);
  };
  const markComplete = () => {
    console.log("complete marked", id);
  };
  return (
    <>
      {isEdit ? (
        <EditTask
          users={users}
          task={task}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      ) : (
        <div className="task-summary-wrapper">
          <div className="left">
            <div className="color-icon"></div>
            <div className="summary">
              <p
                className="task-title"
                style={{
                  textDecoration: is_completed ? "line-through" : "none",
                }}
              >
                {task_msg}
              </p>
              <p className="task-date">{task_date}</p>
            </div>
          </div>
          <div className="right">
            <button
              type="button"
              className="right-icon-wrapper edit-icon"
              onClick={handleEdit}
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
                    d="M13.67 5.329L12.589 6.409C12.5628 6.43521 12.5317 6.45601 12.4974 6.4702C12.4632 6.48439 12.4265 6.49169 12.3895 6.49169C12.3524 6.49169 12.3157 6.48439 12.2815 6.4702C12.2473 6.45601 12.2162 6.43521 12.19 6.409L9.58996 3.808C9.56375 3.78181 9.54295 3.75071 9.52876 3.71648C9.51458 3.68225 9.50727 3.64555 9.50727 3.6085C9.50727 3.57144 9.51458 3.53475 9.52876 3.50052C9.54295 3.46629 9.56375 3.43519 9.58996 3.409L10.67 2.329C10.8814 2.11845 11.1676 2.00023 11.466 2.00023C11.7643 2.00023 12.0506 2.11845 12.262 2.329L13.671 3.737C14.111 4.176 14.11 4.888 13.67 5.329ZM8.65996 4.337L2.50596 10.492L2.00896 13.34C1.99334 13.429 1.99937 13.5205 2.02655 13.6066C2.05372 13.6928 2.10124 13.7712 2.16508 13.8351C2.22893 13.8991 2.30723 13.9467 2.39336 13.974C2.4795 14.0013 2.57094 14.0075 2.65996 13.992L5.50796 13.492L11.663 7.338C11.6892 7.31181 11.71 7.28071 11.7242 7.24648C11.7384 7.21225 11.7457 7.17555 11.7457 7.1385C11.7457 7.10144 11.7384 7.06475 11.7242 7.03052C11.71 6.99629 11.6892 6.96519 11.663 6.939L9.06096 4.337C9.00777 4.28424 8.93589 4.25463 8.86096 4.25463C8.78604 4.25463 8.71416 4.28424 8.66096 4.337H8.65996ZM4.06196 11.937H5.18696V12.787L3.67496 13.052L2.94596 12.322L3.21096 10.812H4.06196V11.936V11.937Z"
                    fill="#464A55"
                  />
                </g>
              </svg>
            </button>
            {is_completed ? (
              <button
                className="right-icon-wrapper unread-icon"
                onClick={markInComplete}
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
                      d="M12.6667 2H3.32667C2.58667 2 2.00667 2.59333 2.00667 3.33333L2 12.6667C2 13.4 2.58667 14 3.32667 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.97971 13.8595 2.64057 13.6095 2.39052C13.3594 2.14048 13.0203 2 12.6667 2ZM12.6667 10H10C10 11.1067 9.1 12 8 12C6.9 12 6 11.1067 6 10H3.32667V3.33333H12.6667V10Z"
                      fill="#464A55"
                    />
                  </g>
                </svg>
              </button>
            ) : (
              <>
                <button className="right-icon-wrapper snooze-icon">
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
                        d="M4.888 12.6H9.711C9.4672 13.0243 9.11609 13.377 8.69291 13.6227C8.26973 13.8685 7.78935 13.9986 7.3 14C6.81048 13.9988 6.3299 13.8687 5.90652 13.623C5.48315 13.3773 5.13188 13.0244 4.888 12.6ZM11.5 9.1C11.5 10.26 12.44 11.2 13.6 11.2V11.9H1V11.2C1.55695 11.2 2.0911 10.9788 2.48492 10.5849C2.87875 10.1911 3.1 9.65695 3.1 9.1V5.6C3.1 4.48609 3.5425 3.4178 4.33015 2.63015C5.1178 1.8425 6.18609 1.4 7.3 1.4V6.3H11.5V9.1ZM14.3 4.9H8.643L11.443 1.4H8.7V0H14.357L11.557 3.5H14.3V4.9Z"
                        fill="#464A55"
                      />
                    </g>
                  </svg>
                </button>
                <button
                  className="right-icon-wrapper tick-icon"
                  onClick={markComplete}
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
                        d="M13.317 3.121L6.01902 10.419L2.68302 7.082C2.6054 7.00451 2.5002 6.96098 2.39052 6.96098C2.28083 6.96098 2.17564 7.00451 2.09802 7.082L1.12102 8.059C1.04352 8.13662 1 8.24182 1 8.3515C1 8.46118 1.04352 8.56638 1.12102 8.644L5.72702 13.25C5.80464 13.3275 5.90983 13.371 6.01952 13.371C6.1292 13.371 6.2344 13.3275 6.31202 13.25L14.879 4.683C14.9565 4.60538 15 4.50018 15 4.3905C15 4.28082 14.9565 4.17562 14.879 4.098L13.902 3.121C13.8244 3.04351 13.7192 2.99998 13.6095 2.99998C13.4998 2.99998 13.3946 3.04351 13.317 3.121Z"
                        fill="#464A55"
                      />
                    </g>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export { TaskSummary };
