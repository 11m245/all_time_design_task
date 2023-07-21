import { useContext, useEffect, useState } from "react";
import "./customSelect.css";
import { AllTimeContext } from "../../App";
import { SelectHeader } from "./SelectHeader";
import { SelectOptions } from "./SelectOptions";
function CustomSelect(props) {
  const { name, options, value, onOptionChange } = props;
  const [userOptions, setShowUserOptions] = useState(false);

  return (
    <>
      <div
        className="custom-select-wrapper"
        onClick={() => setShowUserOptions(!userOptions)}
      >
        <SelectHeader value={value} users={options} userOptions={userOptions} />
        {userOptions ? (
          <SelectOptions
            value={value}
            options={options}
            onOptionChange={onOptionChange}
            userOptions={userOptions}
            setShowUserOptions={setShowUserOptions}
          />
        ) : null}
      </div>
    </>
  );
}

export { CustomSelect };
