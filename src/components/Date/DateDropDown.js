import { useState } from "react";
import { useComponentVisible } from "../CompononentVisible";
import { DateHeader } from "./DateHeader";
import { MonthDates } from "./MonthDates";

function DateDropDown({
  selectedDate,
  setSelectedDate,
  onChange,
  setShowDateDropDown,
  showDateDropDown,
}) {
  const [viewDate, setViewDate] = useState(selectedDate);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(showDateDropDown);

  return (
    <>
      {isComponentVisible ? (
        <div className="date-dropdown-wrapper" ref={ref}>
          <DateHeader viewDate={viewDate} setViewDate={setViewDate} />
          <MonthDates
            viewDate={viewDate}
            selectedDate={selectedDate}
            setViewDate={setViewDate}
            handleDateChange={(e) => {
              onChange(e, viewDate.getFullYear(), viewDate.getMonth());
              // console.log("handle month comp onchange in pop", e);
              // console.log(
              //   new Date(
              //     viewDate.getFullYear(),
              //     viewDate.getMonth(),
              //     e.target.innerText
              //   )
              // );
              setSelectedDate(
                new Date(
                  viewDate.getFullYear(),
                  viewDate.getMonth(),
                  e.target.innerText
                )
              );

              if (e.target.className === "day-text") {
                setShowDateDropDown(false);
                // console.log("runn");
              }
            }}
          />
        </div>
      ) : null}
    </>
  );
}

export { DateDropDown };
