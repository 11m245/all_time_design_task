import "./customSelect.css";

import { SelectHeader } from "./SelectHeader";
import { SelectOptions } from "./SelectOptions";
import { useComponentVisible } from "../CompononentVisible";
import { useState } from "react";
function CustomSelect(props) {
  const { name, options, value, onOptionChange } = props;
  //
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearchChange = (e) => {
    // console.log("search", e.target.value);
    const filteredUsers = options.filter((option) =>
      option.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    console.log("filt", filteredUsers);

    setFilteredOptions(filteredUsers);
  };

  return (
    <>
      <div
        className="custom-select-wrapper"
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <SelectHeader
          handleSearchChange={handleSearchChange}
          value={value}
          users={options}
          isComponentVisible={isComponentVisible}
          setIsComponentVisible={setIsComponentVisible}
        />
        {isComponentVisible ? (
          <SelectOptions
            value={value}
            options={filteredOptions}
            onOptionChange={onOptionChange}
            isComponentVisible={isComponentVisible}
            setIsComponentVisible={setIsComponentVisible}
          />
        ) : null}
      </div>
    </>
  );
}

export { CustomSelect };
