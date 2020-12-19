import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useQueryParams from '../../../custom-hooks/useQueryParams.js';
import NavBar from '../../Common/NavBar/NavBar';
import AllRecipesview from './AllRecipesView';
import NavBarLinks from './NavBarLinks';
import allRecipesPage from './img/all-recipes-page.jpg';
import recipesByCategoryPage from './img/recipes-by-category.jpg';

const useStyles = makeStyles((theme) => ({
  allRecipesImageContainer: {
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
    backgroundImage: `url('${allRecipesPage}')`,
  },
  recipesByCategoryImageContainer: {
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
    backgroundImage: `url('${recipesByCategoryPage}')`,
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
}));

const AllRecipes = ({ recipes, categories, measures, createRecipe }) => {
  const { category } = useQueryParams();

  const classes = useStyles();

  const [recipesData, setRecipesData] = useState(recipes);

  const handleChange = (ev) => {
    if (ev.target.value === '') {
      setRecipesData(recipes);
    } else {
      if (!category) {
        const filteredRecipes = recipesData.filter((recipe) =>
          recipe.recipeName.toLowerCase().includes(ev.target.value),
        );
        setRecipesData(filteredRecipes);
      } else {
        const filteredRecipes = recipesData.filter(
          (recipe) =>
            recipe.recipeName.toLowerCase().includes(ev.target.value) &&
            recipe.category === category,
        );
        setRecipesData(filteredRecipes);
      }
    }
  };

  return (
    <React.Fragment>
      <NavBar
        color="transparent"
        brand="The Mark Cookbook."
        brandLink="http://localhost:3000/home"
        fixed
        rightLinks={
          <NavBarLinks
            search={handleChange}
            hasCategory={category !== undefined ? true : false}
          />
        }
        changeColorOnScroll={{
          height: 240,
          color: 'white',
        }}
      />
      <div
        className={
          !category
            ? classes.allRecipesImageContainer
            : classes.recipesByCategoryImageContainer
        }
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={'auto'}
            className={classes.titleContainer}
          >
            <h1 className={classes.title}>
              {!category
                ? 'Всички рецепти'
                : `${category
                  .substring(0, 1)
                  .toUpperCase()}${category.substring(1)}`}
            </h1>
          </Grid>
        </Grid>
      </div>
      <Container style={{ padding: '0' }}>
        <Box my={2}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <Grid container>
                {recipesData.map((recipe) => (
                  <AllRecipesview key={recipe.recipeID} recipe={recipe} />
                ))}
              </Grid>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AllRecipes;
