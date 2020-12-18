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
import Button from '@material-ui/core/Button';
import NavBar from '../../Common/NavBar/NavBar';
import NavBarLinks from './NavBarLinks';
import createCategoryPage from './img/create-category-page.jpg';

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
    backgroundImage: `url('${createCategoryPage}')`,
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
    backgroundColor: '#00acc1',
    padding: '10px 25px',
    marginTop: '1%',
    display: 'block',
    '&:hover': {
      backgroundColor: '#007887',
    },
  },
}));

const CreateCategory = ({ sendCategory }) => {
  const classes = useStyles();

  const [form, setForm] = useState({
    value: '',
    validations: {
      required: true,
      minLength: 3,
    },
    valid: false,
    touched: false,
  });

  const send = (ev) => {
    ev.preventDefault();

    const categoryData = { categoryName: form.value };

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
    const { value } = ev.target;

    const updatedForm = { ...form };
    console.log(updatedForm);

    updatedForm.value = value;
    updatedForm.touched = true;
    updatedForm.valid = isInputValid(value, updatedForm.validations);

    setForm(updatedForm);
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
            <h1 className={classes.title}>Нова категория</h1>
          </Grid>
        </Grid>
      </div>
      <Container style={{ padding: '0' }}>
        <Box my={2}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <div className={classes.formContainer}>
                <form noValidate autoComplete="off" onSubmit={send}>
                  <ThemeProvider theme={theme}>
                    <TextField
                      id="outlined-basic"
                      label="Име"
                      variant="outlined"
                      value={form.value}
                      onChange={handleChange}
                      style={{ width: '50%' }}
                      helperText={
                        form.touched && !form.valid
                          ? '* Въведи повече от 3 символа!'
                          : ''
                      }
                    />
                  </ThemeProvider>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.button}
                    disabled={!form.valid}
                  >
                    Изпрати
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default CreateCategory;
