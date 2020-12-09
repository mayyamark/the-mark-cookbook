import { useState } from 'react';

const CreateCategory = ({ sendCategory }) => {
  const [form, setForm] = useState({
    categoryName: {
      value: '',
      validations: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const send = (ev) => {
    ev.preventDefault();

    const categoryData = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value,
      };
    }, {});

    sendCategory(categoryData);
  };

  const isInputValid = (input, validations) => {
    let isValid = true;

    if (validations.required) {
      isValid = isValid && input.length !== 0;
    }
    if (validations.minLength) {
      isValid = isValid && input.length >= validations.minLength;
    }

    return isValid;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const formattedValue = !isNaN(value) ? +value : value;

    const updatedElement = { ...form[name] };
    updatedElement.value = formattedValue;
    updatedElement.touched = true;
    updatedElement.valid = isInputValid(
      formattedValue,
      updatedElement.validations,
    );

    const updatedForm = { ...form, [name]: updatedElement };
    setForm(updatedForm);

    const checkIfFormIsValid = Object.values(updatedForm).every(
      (el) => el.valid,
    );
    setIsFormValid(checkIfFormIsValid);
  };

  return (
    <form onSubmit={send}>
      <label htmlFor="categoryName">Име на категорията:</label>
      <input
        type="text"
        name="categoryName"
        value={form.categoryName.value}
        onChange={handleChange}
      />
      <button disabled={!isFormValid}>Изпрати</button>
    </form>
  );
};

export default CreateCategory;
