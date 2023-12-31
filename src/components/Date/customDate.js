import { useState } from "react";
import { DateDropDown } from "./DateDropDown";
import "./date.css";

function CustomDate(props) {
  const { id, name, value, onChange } = props;
  const [showDateDropDown, setShowDateDropDown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : new Date()
  );

  const strWithZero = (num) => {
    const str = String(num);
    if (str.length < 2) {
      return str.padStart(2, "0");
    } else {
      return str;
    }
  };

  return (
    <>
      <div
        className="date-input-field-container"
        onClick={() => setShowDateDropDown(!showDateDropDown)}
      >
        <input
          className="date-input-wrapper"
          id={id}
          name={name}
          type="date"
          // onChange={(e) => {
          //   // console.log("onchange in input", e.target.value);
          //   onChange(
          //     `${selectedDate.getFullYear()}-${strWithZero(
          //       selectedDate.getMonth() + 1
          //     )}-${strWithZero(selectedDate.getDate())}`
          //   );
          // }}
          value={value}
          onClick={(e) => e.preventDefault()}
        ></input>
        <div className="date-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.625 9H4.375C4.27562 8.99974 4.1804 8.96014 4.11013 8.88987C4.03986 8.8196 4.00026 8.72437 4 8.625V7.375C4 7.169 4.169 7 4.375 7H5.625C5.831 7 6 7.169 6 7.375V8.625C5.99974 8.72437 5.96014 8.8196 5.88987 8.88987C5.8196 8.96014 5.72438 8.99974 5.625 9ZM9 8.625V7.375C8.99974 7.27562 8.96014 7.1804 8.88987 7.11013C8.8196 7.03986 8.72438 7.00026 8.625 7H7.375C7.27562 7.00026 7.1804 7.03986 7.11013 7.11013C7.03986 7.1804 7.00026 7.27562 7 7.375V8.625C7 8.831 7.169 9 7.375 9H8.625C8.72438 8.99974 8.8196 8.96014 8.88987 8.88987C8.96014 8.8196 8.99974 8.72437 9 8.625ZM12 8.625V7.375C11.9997 7.27562 11.9601 7.1804 11.8899 7.11013C11.8196 7.03986 11.7244 7.00026 11.625 7H10.375C10.2756 7.00026 10.1804 7.03986 10.1101 7.11013C10.0399 7.1804 10.0003 7.27562 10 7.375V8.625C10 8.831 10.169 9 10.375 9H11.625C11.7244 8.99974 11.8196 8.96014 11.8899 8.88987C11.9601 8.8196 11.9997 8.72437 12 8.625ZM9 11.625V10.375C8.99974 10.2756 8.96014 10.1804 8.88987 10.1101C8.8196 10.0399 8.72438 10.0003 8.625 10H7.375C7.27562 10.0003 7.1804 10.0399 7.11013 10.1101C7.03986 10.1804 7.00026 10.2756 7 10.375V11.625C7 11.831 7.169 12 7.375 12H8.625C8.72438 11.9997 8.8196 11.9601 8.88987 11.8899C8.96014 11.8196 8.99974 11.7244 9 11.625ZM6 11.625V10.375C5.99974 10.2756 5.96014 10.1804 5.88987 10.1101C5.8196 10.0399 5.72438 10.0003 5.625 10H4.375C4.27562 10.0003 4.1804 10.0399 4.11013 10.1101C4.03986 10.1804 4.00026 10.2756 4 10.375V11.625C4 11.831 4.169 12 4.375 12H5.625C5.72438 11.9997 5.8196 11.9601 5.88987 11.8899C5.96014 11.8196 5.99974 11.7244 6 11.625ZM12 11.625V10.375C11.9997 10.2756 11.9601 10.1804 11.8899 10.1101C11.8196 10.0399 11.7244 10.0003 11.625 10H10.375C10.2756 10.0003 10.1804 10.0399 10.1101 10.1101C10.0399 10.1804 10.0003 10.2756 10 10.375V11.625C10 11.831 10.169 12 10.375 12H11.625C11.7244 11.9997 11.8196 11.9601 11.8899 11.8899C11.9601 11.8196 11.9997 11.7244 12 11.625ZM15 3.5V14.5C15 14.8978 14.842 15.2794 14.5607 15.5607C14.2794 15.842 13.8978 16 13.5 16H2.5C2.10218 16 1.72064 15.842 1.43934 15.5607C1.15804 15.2794 1 14.8978 1 14.5V3.5C1 3.10218 1.15804 2.72064 1.43934 2.43934C1.72064 2.15804 2.10218 2 2.5 2H4V0.375C4 0.169 4.169 0 4.375 0H5.625C5.831 0 6 0.169 6 0.375V2H10V0.375C10 0.169 10.169 0 10.375 0H11.625C11.831 0 12 0.169 12 0.375V2H13.5C13.8978 2 14.2794 2.15804 14.5607 2.43934C14.842 2.72064 15 3.10218 15 3.5ZM13.5 14.313V5H2.5V14.313C2.5 14.416 2.584 14.5 2.688 14.5H13.312C13.3619 14.5 13.4097 14.4802 13.4449 14.4449C13.4802 14.4097 13.5 14.3619 13.5 14.312V14.313Z"
              fill="#262E39"
            />
          </svg>
        </div>
      </div>
      {showDateDropDown ? (
        <DateDropDown
          showDateDropDown={showDateDropDown}
          setShowDateDropDown={setShowDateDropDown}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onChange={onChange}
        />
      ) : null}

      {/* {showDateDropDown ? (
        <DateDropDown
          setShowDateDropDown={setShowDateDropDown}
          selectedDate={selectedDate}
          onChange={onChange}
        />
      ) : null} */}
    </>
  );
}

export { CustomDate };
