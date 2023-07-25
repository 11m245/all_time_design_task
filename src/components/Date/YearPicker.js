function YearPicker({
  viewDate,
  setViewDate,
  selectedDate,
  setSelectedDate,
  setShowPage,
  showPage,
}) {
  return (
    <>
      <YearHeader
        viewDate={viewDate}
        setViewDate={setViewDate}
        setShowPage={setShowPage}
      />
      <Years
        viewDate={viewDate}
        setViewDate={setViewDate}
        setShowPage={setShowPage}
      />
    </>
  );
}

function YearHeader({ viewDate, setViewDate, setShowPage }) {
  return (
    <>
      <div className="year-header">
        <button
          type="button"
          className="month-arrow"
          onClick={() =>
            setViewDate(
              new Date(
                viewDate.getFullYear() - 10,
                viewDate.getMonth(),
                viewDate.getDate()
              )
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.43877 3.12552L6.1397 3.82645C6.30945 3.9962 6.30666 4.2723 6.13352 4.43859L3.25073 7.20709H15.5643C15.801 7.20709 15.9929 7.39898 15.9929 7.63566V8.63566C15.9929 8.87234 15.801 9.06423 15.5643 9.06423H3.25073L6.13348 11.8327C6.30666 11.999 6.30945 12.2751 6.13966 12.4449L5.43873 13.1458C5.27138 13.3132 5.00002 13.3132 4.83262 13.1458L0.125518 8.4387C-0.0418393 8.27134 -0.0418393 7.99998 0.125518 7.83259L4.8327 3.12552C5.00005 2.95816 5.27141 2.95816 5.43877 3.12552Z"
              fill="#262E39"
            />
          </svg>
        </button>
        <div className="year-name title">
          {`${viewDate.getFullYear() - (viewDate.getFullYear() % 10)}`}-
          {`${viewDate.getFullYear() - (viewDate.getFullYear() % 10) + 9}`}
        </div>
        <button
          type="button"
          className="month-arrow"
          onClick={() => {
            // console.log("cl arrow");
            setViewDate(
              new Date(
                viewDate.getFullYear() + 10,
                viewDate.getMonth(),
                viewDate.getDate()
              )
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_1_412)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.56123 12.8745L8.8603 12.1736C8.69055 12.0038 8.69334 11.7277 8.86648 11.5614L11.7493 8.79291L-0.564303 8.79291C-0.800982 8.79291 -0.992875 8.60102 -0.992875 8.36434V7.36434C-0.992875 7.12766 -0.800982 6.93577 -0.564303 6.93577L11.7493 6.93577L8.86652 4.16727C8.69334 4.00098 8.69055 3.72488 8.86034 3.55513L9.56127 2.8542C9.72862 2.68684 9.99998 2.68684 10.1674 2.8542L14.8745 7.5613C15.0418 7.72866 15.0418 8.00002 14.8745 8.16741L10.1673 12.8745C9.99995 13.0418 9.72859 13.0418 9.56123 12.8745Z"
                fill="#262E39"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_412">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="matrix(-1 0 0 -1 16 16)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </>
  );
}

function Years({ viewDate, setViewDate, setShowPage }) {
  const getYears = (viewDate) => {
    const exactYear = viewDate.getFullYear();
    const startYear = viewDate.getFullYear() - (viewDate.getFullYear() % 10);
    const endYear = startYear + 9;
    const yearArray = [];
    yearArray.push(startYear - 1);
    for (let i = startYear; i <= endYear; i++) {
      yearArray.push(i);
    }
    yearArray.push(endYear + 1);

    return yearArray;
  };
  return (
    <>
      <div className="years-container">
        {getYears(viewDate).map((year, i) => (
          <button
            type="button"
            className="year-container"
            style={i === 0 || i === 11 ? { color: "#666666" } : null}
            key={i}
            onClick={() => {
              setViewDate(
                new Date(year, viewDate.getMonth(), viewDate.getDate())
              );
              setShowPage("month");
            }}
          >
            {year}
          </button>
        ))}
      </div>
    </>
  );
}
export { YearPicker };
