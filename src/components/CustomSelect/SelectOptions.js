import { useComponentVisible } from "../CompononentVisible";

export function SelectOptions(props) {
  const { value, options, onOptionChange, userOptions } = props;

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(userOptions);

  const handleOptionClick = (e) => {
    // console.log(e.target.innerText);
    onOptionChange(e.target.innerText);
  };
  return (
    <>
      {isComponentVisible ? (
        <div className="select-options-wrapper" ref={ref}>
          <div className="style-arrow"></div>
          {options.map((user) => (
            <div
              key={user.id}
              className="option-wrapper"
              onClick={handleOptionClick}
            >
              <div className="select-symbol">
                {/* {console.log("match r", user.id, value)} */}
                {user.id === value ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.317 3.12102L6.01902 10.419L2.68302 7.08202C2.52139 6.92066 2.25964 6.92066 2.09802 7.08202L1.12102 8.05902C0.959661 8.22064 0.959661 8.48239 1.12102 8.64402L5.72702 13.25C5.88864 13.4114 6.15039 13.4114 6.31202 13.25L14.879 4.68302C15.0404 4.52139 15.0404 4.25964 14.879 4.09802L13.902 3.12102C13.7404 2.95966 13.4786 2.95966 13.317 3.12102Z"
                      fill="#3366FF"
                    />
                  </svg>
                ) : null}
              </div>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
