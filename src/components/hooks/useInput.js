import React from "react";
function useInput(initalState) {
  const [value, setValue] = React.useState(initalState);

  const handleInputChange = e => {
    setValue(e.target.value);
  };

  return [
    {
      value: value,
      onChange: handleInputChange
    },
    setValue,
  ];
}

export default useInput;
