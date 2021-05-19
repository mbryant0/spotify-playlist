import { useState, useEffect, useCallback } from 'react';
import * as yup from 'yup';

const useYupValidation = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
/* const [newValue, setNewValue] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [errorMessages, setErrorMessages] = useState(errorMessageShape);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value, { strict: true })
      .then(() => {
        setErrorMessages({ ...errorMessages, [name]: '' });
      })
      .catch((err) => {
        setErrorMessages({ ...errorMessages, [name]: 'error' });
      });
  };

  useEffect(() => {
    schema.isValid(newValue).then((valid) => setDisabled(!valid));
    console.log(schema);
  });

  return {
    newValue,
    setNewValue,
    bind: {
      onChange: (e) => {
        const { checked, value, name, type } = e.target;
        const updatedInfo = type === 'checkbox' ? checked : value;
        setNewValue({ ...newValue, [name]: updatedInfo });
        setFormErrors(name, updatedInfo);
      },
    },
    disabled,
  };
};
 */
export default useYupValidation;
