import { useState } from 'react';

const useSlider = (initialState) => {
  const [value, setValue] = useState(initialState);

  return {
    value,
    setValue,
    bind: {
      onChange: (event, newValue) => {
        setValue(newValue);
      },
    },
  };
};

export default useSlider;
