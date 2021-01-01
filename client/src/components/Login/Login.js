import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '../Common/Card/Card';
import CardBody from '../Common/Card/CardBody';
import CardFooter from '../Common/Card/CardFooter';
import CustomInput from '../Common/CustomInput/CustomInput';
import loginPage from './img/login-page.png';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    color: '#495057',
  },
  container: {
    width: '90%',
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
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
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    color: '#FFFFFF',
    paddingBottom: '200px',
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center',
    '&:before': {
      background: 'rgba(0, 0, 0, 0.5)',
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""',
    },
    '& footer li a,& footer li a:hover,& footer li a:active': {
      color: '#FFFFFF',
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%',
    },
  },
  form: {
    margin: '0',
  },
  cardFooter: {
    paddingTop: '0rem',
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important',
  },
  inputIconsColor: {
    color: '#495057',
  },
  button: {
    color: '#00acc1',
  },
}));

const Login = ({ login }) => {
  const classes = useStyles();

  const [cardAnimaton, setCardAnimation] = useState('cardHidden');
  setTimeout(function () {
    setCardAnimation('');
  }, 700);

  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState({
    username: {
      value: '',
      validations: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      valid: false,
      touched: false,
    },
    password: {
      value: '',
      validations: {
        required: true,
        minLength: 4,
      },
      valid: false,
      touched: false,
    },
  });

  const sendLoginData = (ev) => {
    ev.preventDefault();

    const loginData = Object.keys(form).reduce((acc, key) => {
      return {
        ...acc,
        [key]: form[key].value,
      };
    }, {});

    login(loginData);
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

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;

    const updatedElement = { ...form[name] };
    updatedElement.value = value;
    updatedElement.touched = true;
    updatedElement.valid = isInputValid(value, updatedElement.validations);

    const updatedForm = { ...form, [name]: updatedElement };
    setForm(updatedForm);

    const checkIfFormIsValid = Object.values(updatedForm).every(
      (el) => el.valid,
    );

    setIsFormValid(checkIfFormIsValid);
  };

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: `url(${loginPage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
    >
      <div className={classes.container}>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={4}>
            <Card className={classes[cardAnimaton]}>
              <form
                className={classes.form}
                noValidate
                onSubmit={sendLoginData}
                autoComplete="off"
              >
                <h4 className={classes.title}>Необходима е аутентикация!</h4>
                <CardBody>
                  <CustomInput
                    labelText="Потребителско име"
                    id="first"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: form.username.value,
                      name: 'username',
                      onChange: handleInputChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Парола"
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'password',
                      value: form.password.value,
                      name: 'password',
                      onChange: handleInputChange,
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                      autoComplete: 'off',
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    disabled={!isFormValid}
                    className={classes.button}
                    color="primary"
                    size="large"
                    type="submit"
                  >
                    Продължи
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
