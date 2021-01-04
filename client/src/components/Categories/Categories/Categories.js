import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NavBar from '../../Common/NavBar/NavBar';
import NavBarLinks from './NavBarLinks';
import categoriesPage from './img/categories-page.jpg';
import noImage from './img/no-image.png';

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
    backgroundImage: `url('${categoriesPage}')`,
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
  image: {
    width: '30%',
    height: '10rem',
  },
  link: {
    opacity: '0.8',
    paddingTop: '2%',
    paddingBottom: '2%',
    textAlign: 'center',
    textDecoration: 'none',
    marginTop: '3%',
    marginBottom: '3%',
    fontSize: '1.5rem',
    color: '#3C4858',
    fontWeight: 700,
    '&:hover': {
      opacity: 1,
      borderRadius: '6px',
      textShadow: '2px 2px 8px gray',
      boxShadow:
        '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    },
  },
}));

const Categories = ({ categories }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavBar
        color="transparent"
        brand="The Mark Cookbook."
        brandLink="http://localhost:3000/home"
        fixed
        rightLinks={
          <NavBarLinks />
        }
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
            <h1 className={classes.title}>Категории</h1>
          </Grid>
        </Grid>
      </div>
      <Container style={{ padding: '0' }}>
        <Box my={2}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <List>
                {categories.map((category) => {
                  return (
                    <ListItem key={category.categoryID}>
                      <Link
                        className={classes.link}
                        to={`/recipes?category=${category.category}`}
                      >
                        {category.category}
                        <div className={classes.imagesContainer}>
                          {category.images.length > 0 ? (
                            category.images.map((image) => (
                              <img
                                className={classes.image}
                                key={image.imageID}
                                src={`http://localhost:5000/images/${image.imageName}`}
                                alt="image"
                              />
                            ))
                          ) : (
                            <React.Fragment key={category.category}>
                              <img
                                className={classes.image}
                                src={noImage}
                                alt="image"
                              />
                              <img
                                className={classes.image}
                                src={noImage}
                                alt="image"
                              />
                              <img
                                className={classes.image}
                                src={noImage}
                                alt="image"
                              />
                            </React.Fragment>
                          )}
                        </div>
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Categories;
