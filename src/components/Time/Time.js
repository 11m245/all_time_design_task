import { useContext, useState } from "react";
import "./time.css";
import { AllTimeContext } from "../../App";
function Time(props) {
  const { id, name, value, onChange } = props;
  const [selectedTime, setSelectedTime] = useState(value || 0);
  // const { activePopUp, setActivePopUp } = useContext(AllTimeContext);

  const generateTimesArray = (minuteInterval) => {
    const times = [];
    for (let i = 0; i < 24 * 60; i = i + minuteInterval) {
      times.push({ seconds: i * 60, timeOption: generateTimeOption(i) });
    }
    // console.log(times);
    return times;
  };

  const generateTimeOption = (minuteInterval) => {
    const time = `${
      parseInt(minuteInterval / 60) === 0
        ? 12
        : parseInt(minuteInterval / 60) > 12
        ? parseInt(minuteInterval / 60) - 12
        : parseInt(minuteInterval / 60)
    }:${parseInt(minuteInterval % 60)}:${
      parseInt(minuteInterval / 60) > 12 ? "PM" : "AM"
    }`;
    const formattedTime = time.split(":").map((substr) => {
      if (substr.length < 2) {
        return substr.padStart(2, "0");
      } else {
        return substr;
      }
    });
    return `${formattedTime[0]}:${formattedTime[1]} ${formattedTime[2]}`;
  };
  return (
    <div className="time-input-field-container">
      <select
        className="time-select-wrapper"
        name={name}
        id={id}
        value={selectedTime}
        onChange={(e) => {
          // console.log("onchange time in select", e.target.value);
          setSelectedTime(e.target.value);
          onChange(e.target.value);
        }}
      >
        {generateTimesArray(30).map((option) => (
          <option key={option.seconds} value={option.seconds}>
            {option.timeOption}
          </option>
        ))}
      </select>

      <div className="time-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M7.344 4.281C7.344 3.918 7.636 3.625 8 3.625C8.364 3.625 8.656 3.918 8.656 4.281V7.65L10.989 9.203C11.289 9.405 11.371 9.813 11.147 10.113C11.1027 10.1856 11.0436 10.2481 10.9734 10.2962C10.9032 10.3443 10.8237 10.377 10.74 10.3921C10.6562 10.4072 10.5703 10.4044 10.4877 10.3839C10.4052 10.3634 10.3279 10.3256 10.261 10.273L7.636 8.523C7.453 8.423 7.344 8.219 7.344 7.975V4.281ZM8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1ZM2.312 8C2.31187 8.747 2.4589 9.4867 2.74471 10.1769C3.03051 10.867 3.44948 11.4941 3.97768 12.0223C4.50589 12.5505 5.13298 12.9695 5.82314 13.2553C6.5133 13.5411 7.253 13.6881 8 13.688C8.747 13.6881 9.4867 13.5411 10.1769 13.2553C10.867 12.9695 11.4941 12.5505 12.0223 12.0223C12.5505 11.4941 12.9695 10.867 13.2553 10.1769C13.5411 9.4867 13.6881 8.747 13.688 8C13.6881 7.253 13.5411 6.5133 13.2553 5.82314C12.9695 5.13298 12.5505 4.50589 12.0223 3.97768C11.4941 3.44948 10.867 3.03051 10.1769 2.74471C9.4867 2.4589 8.747 2.31187 8 2.312C7.253 2.31187 6.5133 2.4589 5.82314 2.74471C5.13298 3.03051 4.50589 3.44948 3.97768 3.97768C3.44948 4.50589 3.03051 5.13298 2.74471 5.82314C2.4589 6.5133 2.31187 7.253 2.312 8Z"
            fill="#262E39"
          />
        </svg>
      </div>
    </div>
  );
}

export { Time };
