export function MonthDates(props) {
  const { viewDate, setViewDate, handleDateChange, selectedDate } = props;
  // const date = new Date().getDate();
  // const month = new Date().getMonth();
  // const year = new Date().getFullYear();
  // const dayNumber = new Date().getDay();
  const date = viewDate.getDate();
  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();
  const dayNumber = viewDate.getDay();
  // console.log("viewDate", dayNumber, date, month, year);
  function getWeeksForMonth(year, month) {
    const firstOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstOfMonth.getDay();
    // console.log(firstOfMonth, firstDayOfWeek);
    const weeks = [];
    let currentWeek = [];
    let currentDate = firstOfMonth;

    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    while (currentDate.getMonth() === month) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(currentDate);
      currentDate = new Date(year, month, currentDate.getDate() + 1);
    }

    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);

    return weeks;
  }

  const weeks = getWeeksForMonth(year, month);
  // console.log("weeks data for cal", weeks);
  return (
    <div
      className="month-dates-container"
      // onClick={(e) => console.log("date cl", e.target.innerText)}
      onClick={handleDateChange}
    >
      <div className="week-container dayName-container">
        {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((dayName, i) => (
          <div className="day-container" key={i}>
            <div className="day-text day-name-text">{dayName}</div>
          </div>
        ))}
      </div>
      {weeks.map((week, i) => (
        <Week
          key={i}
          selectedDate={selectedDate}
          viewDate={viewDate}
          week={week}
        />
      ))}
    </div>
  );
}
function Week({ week, viewDate, selectedDate }) {
  return (
    <div className="week-container">
      {week.map((day, i) => (
        <Day
          key={i}
          selectedDate={selectedDate}
          viewDate={viewDate}
          day={day}
        />
      ))}
    </div>
  );
}
function Day({ day, viewDate, selectedDate }) {
  return (
    <div
      style={
        selectedDate?.getDate() === day?.getDate()
          ? { backgroundColor: "#4681B6", color: "#fff", borderRadius: "50%" }
          : null
      }
      className="day-container"
    >
      <div className="day-text">{day ? day.getDate() : null}</div>
    </div>
  );
}
