import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavBar from '../Common/NavBar/NavBar';
import ProductSection from './Sections/ProductSection';
import AboutMeSection from './Sections/AboutMeSection';
import NavBarLinks from './Sections/NavBarLinks';
import homePage from './Sections/img/home-page.jpg';

const useStyles = makeStyles((theme) => ({
  image: {
    height: '90vh',
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
    backgroundImage: `url('${homePage}')`,
  },
  titleContainer: {
    width: '100%',
    position: 'relative',
    flexBasis: 'auto',
    minHeight: '1px',
    paddingLeft: '7%',
    paddingRight: '7%',
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
  subtitle: {
    fontSize: '1.5rem',
    lineHeight: '1.5em',
    marginTop: '10px',
    marginBottom: '10px',
    fontWeight: '500',
    color: '#FFFFFF',
    textShadow: '4px 2px 20px black, 0 0 4px black',
  },
  button: {
    backgroundColor: '#00acc1',
    padding: '10px 25px',
    '&:hover': {
      backgroundColor: '#007887',
    },
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
}));

const Home = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <NavBar
        color="transparent"
        brand="The Mark Cookbook"
        brandLink="http://localhost:3000/home"
        fixed
        rightLinks={<NavBarLinks />}
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />
      <div className={classes.image}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={'auto'}
            className={classes.titleContainer}
          >
            <h1 className={classes.title}>The Mark Cookbook.</h1>
            <h4 className={classes.subtitle}>
              Най-вкусните рецепти, събрани на едно място...
            </h4>
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="large"
              href="http://localhost:3000/categories"
              rel="noopener noreferrer"
            >
              Към рецептите
            </Button>
          </Grid>
        </Grid>
      </div>

      <Container style={{ padding: '0'}}>
        <Box my={2}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <ProductSection />
              <AboutMeSection />
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
