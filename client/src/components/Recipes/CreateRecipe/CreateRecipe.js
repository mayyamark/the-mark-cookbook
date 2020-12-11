import { useState } from 'react';

const CreateRecipe = ({ categories, measures, sendRecipe }) => {
  const [form, setForm] = useState({
    recipeName: {
      value: '',
      validations: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    category: {
      value: '',
      validations: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    instructions: {
      value: '',
      validations: {
        required: true,
        minLength: 15,
        maxLength: 500,
      },
      valid: false,
      touched: false,
    },
    ingredients: {
      value: [{ ingredient: '', measure: '', amount: '' }],
      validations: {
        required: true,
        minLength: 1,
        maxLength: 45,
      },
      valid: false,
      touched: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const send = (ev) => {
    ev.preventDefault();

    const recipeData = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value,
      };
    }, {});

    sendRecipe(recipeData);
  };

  const isInputValid = (input, validations) => {
    let isValid = true;

    if (validations.required) {
      isValid = isValid && input.length !== 0;
    }
    if (validations.minLength) {
      isValid = isValid && input.length >= validations.minLength;
    }
    if (validations.maxLength) {
      isValid = isValid && input.length <= validations.maxLength;
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

  const addIngredient = (ev) => {
    ev.preventDefault();
    const updatedIngredients = { ...form['ingredients'] };
    updatedIngredients.value.push({ ingredient: '', measure: '', amount: '' });

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };
    setForm(updatedForm);
  };

  const removeIngredient = (ev) => {
    ev.preventDefault();

    const { id } = ev.target;
    const updatedIngredients = { ...form['ingredients'] };
    updatedIngredients.value.splice(id, 1);

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };
    setForm(updatedForm);
  };

  const handleIngredientChange = (ev) => {
    const { name, value, id } = ev.target;

    const updatedIngredients = { ...form['ingredients'] };
    updatedIngredients.touched = true;
    updatedIngredients.value[+id][name] = value;
    updatedIngredients.valid = updatedIngredients.value.every((ingr) => {
      return Object.values(ingr).every((el) =>
        isInputValid(el, updatedIngredients.validations),
      );
    });

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };

    setForm(updatedForm);
    const checkIfFormIsValid = Object.values(updatedForm).every(
      (el) => el.valid,
    );
    setIsFormValid(checkIfFormIsValid);
  };

  return (
    <form onSubmit={send}>
      <label htmlFor="recipeName">Име на рецептата:</label>
      <input
        type="text"
        name="recipeName"
        value={form.recipeName.value}
        onChange={handleChange}
      />
      <label htmlFor="category">Категория:</label>
      <select name="category" onChange={handleChange}>
        <option value={''}>{''}</option>
        {categories.map((cat) => {
          return (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          );
        })}
      </select>
      <label htmlFor="instructions">Инструкции:</label>
      <input
        type="text"
        name="instructions"
        value={form.instructions.value}
        onChange={handleChange}
      />
      <ul>
        {form.ingredients.value.map((input, index) => (
          <li key={index}>
            <label htmlFor="amount">Количество:</label>
            <input
              id={index}
              type="text"
              name="amount"
              value={input.amount}
              onChange={handleIngredientChange}
            />
            <label htmlFor="measure">Мерна единица:</label>
            <select name="measure" id={index} onChange={handleIngredientChange}>
              <option value={''}>{''}</option>
              {measures.map((measure) => {
                return (
                  <option key={measure.measure} value={measure.measure}>
                    {measure.measure}
                  </option>
                );
              })}
            </select>
            <label htmlFor="ingredient">Съставка:</label>
            <input
              id={index}
              type="text"
              name="ingredient"
              value={input.ingredient}
              onChange={handleIngredientChange}
            />
            <button id={index} onClick={(ev) => removeIngredient(ev)}>
              Премахни продукт
            </button>
          </li>
        ))}
        <button onClick={addIngredient}>Добави продукт</button>
      </ul>
      <button disabled={!isFormValid}>Изпрати</button>
    </form>
  );
};

export default CreateRecipe;
