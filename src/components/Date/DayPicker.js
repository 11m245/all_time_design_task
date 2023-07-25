import { DateHeader } from "./DateHeader";
import { MonthDates } from "./MonthDates";
function DayPicker({
  viewDate,
  setViewDate,
  selectedDate,
  setSelectedDate,
  setShowDateDropDown,
  onChange,
  showPage,
  setShowPage,
}) {
  return (
    <>
      <DateHeader
        viewDate={viewDate}
        setViewDate={setViewDate}
        showPage={showPage}
        setShowPage={setShowPage}
      />
      <MonthDates
        viewDate={viewDate}
        selectedDate={selectedDate}
        setViewDate={setViewDate}
        handleDateChange={(e) => {
          onChange(e, viewDate.getFullYear(), viewDate.getMonth());

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
    </>
  );
}

export { DayPicker };
