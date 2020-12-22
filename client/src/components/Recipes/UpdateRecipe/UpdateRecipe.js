import { useState } from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acc1',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  formContainer: {
    textAlign: '-webkit-center',
    padding: '2%',
  },
  button: {
    color: 'white',
  },
  readOnly: {
    cursor: 'default',
  },
  root: {
    width: '70%',
    margin: 'auto',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
    },
    '& .MuiFTextField-root': {
      margin: theme.spacing(1),
    },
  },
  tooltip: {
    padding: '10px 15px',
    minWidth: '130px',
    color: '#555555',
    lineHeight: '1.7em',
    background: '#FFFFFF',
    border: 'none',
    borderRadius: '3px',
    boxShadow:
      '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    maxWidth: '200px',
    textAlign: 'center',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '0.875em',
    fontStyle: 'normal',
    fontWeight: '400',
    textShadow: 'none',
    textTransform: 'none',
    letterSpacing: 'normal',
    wordBreak: 'normal',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'normal',
    lineBreak: 'auto',
  },
  list: {
    width: '97%',
    marginBottom: '3%',
    marginTop: '3%',
    border: '1px solid silver',
    borderRadius: '6px',
  },
  deleteBtn: {
    color: '#f50057',
    border: '1px solid #f50057',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '5px',
    fontSize: '11pt',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(245, 0, 87, 0.04)',
    },
  },
}));

const UpdateRecipe = ({ recipe, categories, measures, sendRecipe }) => {
  const classes = useStyles();

  const { recipeName, category, ingredients, instructions, isDeleted } = recipe;

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
  const [isFormValid, setIsFormValid] = useState(true);

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

    if (updatedIngredients.value[+id].recipeIngredientID !== 0) {
      updatedIngredients.value[+id].ingredient = '';
      updatedIngredients.value[+id].hide = true;
    } else {
      updatedIngredients.value.splice(+id, 1);
    }

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };
    setForm(updatedForm);
  };

  const handleIngredientChange = (ev) => {
    const { name, value, id } = ev.target;
    const formattedValue = !isNaN(value) ? +value : value;

    const formattedId = id ? id : name.substring(7);
    const formattedName = id ? name : name.substring(0, 7);

    const updatedIngredients = { ...form['ingredients'] };
    updatedIngredients.touched = true;
    updatedIngredients.value[+formattedId][formattedName] = formattedValue;

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };

    setForm(updatedForm);
  };
  console.log(form.isDeleted);
  return (
    <div className={classes.formContainer}>
      <form
        onSubmit={update}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <ThemeProvider theme={theme}>
          <TextField
            label="Име"
            name="recipeName"
            variant="outlined"
            value={form.recipeName.value}
            onChange={handleChange}
            style={{ width: '65%' }}
            helperText={
              !form.recipeName.valid ? '* Въведи повече от 3 символа!' : ''
            }
          />
          <FormControl style={{ width: '30%' }} variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Категория
            </InputLabel>
            <Select
              name="category"
              label="Категория"
              onChange={handleChange}
              defaultValue={form.category.value}
            >
              {categories.map((cat) => {
                return (
                  <MenuItem key={cat.category} value={cat.category}>
                    {cat.category}
                  </MenuItem>
                );
                // }
              })}
            </Select>
            {!form.category.valid && (
              <FormHelperText>* Избери категория!</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="Инструкции"
            name="instructions"
            multiline
            style={{ width: '97%' }}
            rows={5}
            value={form.instructions.value}
            onChange={handleChange}
            variant="outlined"
            helperText={
              !form.instructions.valid ? '* Въведи между 15 и 500 символа!' : ''
            }
          />
          <List className={classes.list}>
            {form.ingredients.value.map((input, index) => {
              if (!input.hide) {
                return (
                  <ListItem key={index}>
                    <TextField
                      id={index.toString()}
                      label="Количество"
                      name="amount"
                      value={input.amount}
                      onChange={handleIngredientChange}
                      variant="outlined"
                      style={{ width: '33%' }}
                    />
                    <FormControl style={{ width: '20%' }} variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        М. ед.
                      </InputLabel>
                      <Select
                        name={`measure${index}`}
                        onChange={handleIngredientChange}
                        label="Мерна единица"
                        defaultValue={form.ingredients.value[index].measure}
                      >
                        {measures.map((measure) => {
                          return (
                            <MenuItem
                              key={measure.measure}
                              value={measure.measure}
                            >
                              {measure.measure}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <TextField
                      id={index.toString()}
                      label="Съставка"
                      name="ingredient"
                      value={input.ingredient}
                      onChange={handleIngredientChange}
                      variant="outlined"
                      style={{ width: '40%' }}
                    />
                    <Tooltip
                      title="Изтрий продукт!"
                      placement={window.innerWidth > 959 ? 'bottom' : 'right'}
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <button
                        className={classes.deleteBtn}
                        id={index.toString()}
                        onClick={(ev) => removeIngredient(ev)}
                        color="secondary"
                      >
                        Изтрий
                      </button>
                    </Tooltip>
                  </ListItem>
                );
              }
            })}
            <Tooltip
              title="Добави продукт!"
              placement={window.innerWidth > 959 ? 'bottom' : 'right'}
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                variant="outlined"
                size="small"
                color="primary"
                onClick={addIngredient}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </List>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            disabled={!isFormValid}
          >
            Запази
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default UpdateRecipe;
