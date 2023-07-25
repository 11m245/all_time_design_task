import { useState } from "react";
import { useComponentVisible } from "../CompononentVisible";

import { DayPicker } from "./DayPicker";
import { MonthPicker } from "./MonthPicker";
import { YearPicker } from "./YearPicker";

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
  const [showPage, setShowPage] = useState("date");

  return (
    <>
      {isComponentVisible ? (
        <div className="date-dropdown-wrapper" ref={ref}>
          <div className="style-arrow"></div>
          {showPage === "date" ? (
            <DayPicker
              viewDate={viewDate}
              setViewDate={setViewDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setShowDateDropDown={setShowDateDropDown}
              onChange={onChange}
              setShowPage={setShowPage}
              showPage={showPage}
            />
          ) : null}
          {showPage === "month" ? (
            <MonthPicker
              viewDate={viewDate}
              setViewDate={setViewDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setShowPage={setShowPage}
              showPage={showPage}
            />
          ) : null}
          {showPage === "year" ? (
            <YearPicker
              viewDate={viewDate}
              setViewDate={setViewDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setShowPage={setShowPage}
              showPage={showPage}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export { DateDropDown };
