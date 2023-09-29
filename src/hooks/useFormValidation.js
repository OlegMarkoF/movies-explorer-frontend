import { useState, useCallback } from 'react';

const useFormValidation = (initialValues = {}, initialErrors = {}, initialValid = false) => {
  const [ values, setValues ] = useState(initialValues);
  const [ errors, setErrors ] = useState(initialErrors);
  const [ isValid, setValid ] = useState(initialValid);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setValid(evt.target.closest('form').checkValidity());
  };

  const regexForEmail = /^((([0-9A-Za-z]{1}[-0-9A-z.]+[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]+[0-9А-Яа-я]{1}))@([-A-Za-z]+\.){1,2}[-A-Za-z]{2,})$/u;
  const handleChangeEmail = (evt) => {
    handleChange(evt);
    const { type, value } = evt.target;
    if (type === 'email' && !regexForEmail.test(value)) {
      setValid(false);
      setErrors((e) => ({ ...e, email: 'Некорректный формат почты: pochta@yandex.ru' }));
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValid(newIsValid);
    },
    [ setValues, setErrors, setValid ]
  );

  return {
    values,
    errors,
    setErrors,
    isValid,
    handleChange,
    handleChangeEmail,
    resetForm,
    setValues,
    setValid,
  };
};

export default useFormValidation;