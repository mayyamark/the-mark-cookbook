import React, { useState } from 'react';
import classNames from 'classnames';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import NavBar from '../../Common/NavBar/NavBar';
import NavBarLinks from './NavBarLinks';
import createRecipePage from './img/create-recipe-page.jpg';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acc1',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    height: '60vh',
    maxHeight: '1000px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    marginTop: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundImage: `url('${createRecipePage}')`,
  },
  titleContainer: {
    width: '100%',
    position: 'relative',
    flexBasis: 'auto',
    minHeight: '1px',
    textAlign: 'center',
  },
  title: {
    display: 'inline-block',
    position: 'relative',
    margin: '1.75rem 0 0.875rem',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '3.5rem',
    lineHeight: '1.15em',
    textShadow: '0 0 11px black, 0 0 4px silver',
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  container: {
    zIndex: '12',
    color: '#FFFFFF',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    '@media (min-width: 576px)': {
      maxWidth: '540px',
    },
    '@media (min-width: 768px)': {
      maxWidth: '720px',
    },
    '@media (min-width: 992px)': {
      maxWidth: '960px',
    },
    '@media (min-width: 1200px)': {
      maxWidth: '1140px',
    },
  },
  imagesContainer: {
    marginTop: '1%',
  },
  formContainer: {
    textAlign: '-webkit-center',
    padding: '10% 0 10% 0',
  },
  button: {
    color: 'white',
  },
  readOnly: {
    cursor: 'default',
  },
  root: {
    width: '70%',
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

const CreateRecipe = ({ categories, measures, createRecipe }) => {
  const classes = useStyles();

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

    createRecipe(recipeData);
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
    console.log(ev.target);
    ev.preventDefault();

    const { id } = ev.target;
    console.log(id);
    const updatedIngredients = { ...form['ingredients'] };
    updatedIngredients.value.splice(id, 1);
    console.log(updatedIngredients);

    const updatedForm = { ...form, ['ingredients']: updatedIngredients };
    setForm(updatedForm);
  };

  const handleIngredientChange = (ev) => {
    const { name, value, id } = ev.target;

    const formattedId = id ? id : name.substring(7);
    const formattedName = id ? name : name.substring(0, 7);

    const updatedIngredients = { ...form['ingredients'] };
    updatedIngredients.touched = true;
    updatedIngredients.value[+formattedId][formattedName] = value;
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
    <React.Fragment>
      <NavBar
        color="transparent"
        brand="The Mark Cookbook."
        brandLink="http://localhost:3000/home"
        fixed
        rightLinks={<NavBarLinks />}
        changeColorOnScroll={{
          height: 240,
          color: 'white',
        }}
      />
      <div className={classes.imageContainer}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={'auto'}
            className={classes.titleContainer}
          >
            <h1 className={classes.title}>Нова рецепта</h1>
          </Grid>
        </Grid>
      </div>
      <Container style={{ padding: '0' }}>
        <Box my={2}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <div className={classes.formContainer}>
                <form
                  onSubmit={send}
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
                        !form.recipeName.valid
                          ? '* Въведи повече от 3 символа!'
                          : ''
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
                      >
                        <MenuItem readOnly={true} className={classes.readOnly}>
                          <b>Избери...</b>
                        </MenuItem>

                        {categories.map((cat) => {
                          return (
                            <MenuItem key={cat.category} value={cat.category}>
                              {cat.category}
                            </MenuItem>
                          );
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
                        !form.instructions.valid
                          ? '* Въведи между 15 и 500 символа!'
                          : ''
                      }
                    />
                    <List className={classes.list}>
                      {form.ingredients.value.map((input, index) => (
                        <ListItem key={index.toString()}>
                          <TextField
                            id={index.toString()}
                            label="Количество"
                            name="amount"
                            value={input.amount}
                            onChange={handleIngredientChange}
                            variant="outlined"
                            style={{ width: '33%' }}
                          />
                          <FormControl
                            style={{ width: '20%' }}
                            variant="outlined"
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              М. ед.
                            </InputLabel>
                            <Select
                              name={`measure${index}`}
                              onChange={handleIngredientChange}
                              label="Мерна единица"
                            >
                              <MenuItem
                                readOnly={true}
                                className={classes.readOnly}
                              >
                                <b>Избери...</b>
                              </MenuItem>
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
                            placement={
                              window.innerWidth > 959 ? 'bottom' : 'right'
                            }
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <button
                              className={classes.deleteBtn}
                              id={index.toString()}
                              onClick={(ev) => removeIngredient(ev)}
                            >Изтрий
                            </button>
                          </Tooltip>
                        </ListItem>
                      ))}
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
                      Изпрати
                    </Button>
                  </ThemeProvider>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default CreateRecipe;
