import { useState } from 'react';

const UpdateRecipe = ({ recipe, sendRecipe }) => {
  const {
    recipeName,
    category,
    ingredients,
    instructions,
    images,
    isDeleted,
  } = recipe;

  const [form, setForm] = useState({
    recipeName: {
      value: recipeName,
      validations: {
        required: true,
        minLength: 3,
      },
      valid: true,
      touched: false,
    },
    category: {
      value: category,
      validations: {
        required: true,
        minLength: 3,
      },
      valid: true,
      touched: false,
    },
    instructions: {
      value: instructions,
      validations: {
        required: true,
        minLength: 15,
        maxLength: 500,
      },
      valid: true,
      touched: false,
    },
    ingredients: {
      value: [...ingredients],
      valid: true,
      touched: false,
    },
    isDeleted: {
      value: isDeleted,
      validations: {
        required: true,
        value: 0 || 1,
      },
      valid: true,
      touched: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);
  console.log(form);

  const update = (ev) => {
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
    if (validations.value) {
      isValid = isValid && input === validations.value;
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
    updatedIngredients.value.push({
      recipeIngredientID: 0,
      ingredient: '',
      measure: '',
      amount: '',
    });

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };
    setForm(updatedForm);
  };

  const removeIngredient = (ev) => {
    ev.preventDefault();

    const { id } = ev.target;
    const updatedIngredients = { ...form['ingredients'] };

    if (updatedIngredients.value[id].recipeIngredientID !== 0) {
      updatedIngredients.value[id].ingredient = '';
      updatedIngredients.value[id].hide = true;
    } else {
      updatedIngredients.value.splice(id, 1);
    }

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };
    setForm(updatedForm);
  };

  const handleIngredientChange = (ev) => {
    const { name, value, id } = ev.target;
    const formattedValue = !isNaN(value) ? +value : value;

    const updatedIngredients = { ...form['ingredients'] };
    updatedIngredients.touched = true;
    updatedIngredients.value[+id][name] = formattedValue;

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };

    setForm(updatedForm);
    const checkIfFormIsValid = Object.values(updatedForm).every(
      (el) => el.valid,
    );
    setIsFormValid(checkIfFormIsValid);
  };

  return (
    <form onSubmit={update}>
      <input
        type="text"
        name="recipeName"
        value={form.recipeName.value}
        onChange={handleChange}
      />
      <label htmlFor="isDeleted">Hide</label>
      <input
        type="radio"
        label="No"
        name="isDeleted"
        value={0}
        defaultChecked={isDeleted === 0}
        onChange={handleChange}
      />
      <input
        type="radio"
        label="Yes"
        name="isDeleted"
        value={1}
        defaultChecked={isDeleted === 1}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        value={form.category.value}
        onChange={handleChange}
      />

      <ul>
        {form.ingredients.value.map((input, index) => {
          if (!input.hide) {
            return (
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
                <input
                  id={index}
                  type="text"
                  name="measure"
                  value={input.measure}
                  onChange={handleIngredientChange}
                />
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
            );
          }
        })}
        <button onClick={addIngredient}>Добави продукт</button>
      </ul>
      <div>
        {images.map((image) => (
          <img
            key={image.imageID}
            src={
              require(`../../../../../server/images/${image.imageName}`).default
            }
            alt="image"
          />
        ))}
      </div>
      <input
        type="text"
        name="instructions"
        value={form.instructions.value}
        onChange={handleChange}
      />
      <button disabled={!isFormValid}>Изпрати промените</button>
    </form>
  );
};

export default UpdateRecipe;
