import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import NavBar from '../../Common/NavBar/NavBar';
import Carousel from '../../Common/Carousel/Carousel';
import AddImages from '../AddImages/AddImages';
import RemoveImages from '../RemoveImages/RemoveImages';
import UpdateRecipe from '../UpdateRecipe/UpdateRecipe';
import NavBarLinks from './NavBarLinks';
import singleRecipePage from './single-recipe-page.jpg';
import 'moment/locale/bg';
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
    backgroundImage: `url('${singleRecipePage}')`,
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
    // color: '#FFFFFF',
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
  subtitle: {
    color: '#3C4858',
    margin: '1.75rem 0 0.875rem',
    textDecoration: 'none',
    fontWeight: '700',
    fontFamily: '"Roboto Slab", "Times New Roman", serif',
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    fontSize: '1.6rem',
    lineHeight: '1.5em',
    textAlign: 'center',
  },
  smallContainer: {
    paddingTop: '2%',
    textAlign: 'center',
    fontSize: '1.1rem',
    color: 'gray',
  },
  date: {
    color: 'gray',
    textAlign: 'center',
    fontWeight: '500',
    paddingBottom: '3%',
  },
  carousel: {
    marginTop: '30%',
  },
  hidden: {
    paddingTop: '3%',
    color: '#f44336',
    textAlign: 'center',
  },
}));

const SingleRecipe = ({
  recipe,
  categories,
  measures,
  updateRecipe,
  addImages,
  removeImages,
}) => {
  const {
    recipeName,
    addDate,
    category,
    ingredients,
    instructions,
    images,
    isDeleted,
  } = recipe;
  moment.locale('bg');
  const classes = useStyles();

  const [updating, setUpdating] = useState(false);
  const [addingImages, setAddingImages] = useState(false);
  const [removingImages, setRemovingImages] = useState(false);

  return (
    <>
      {updating ? (
        <UpdateRecipe
          recipe={recipe}
          categories={categories}
          measures={measures}
          sendRecipe={updateRecipe}
        />
      ) : addingImages ? (
        <AddImages sendImages={addImages} close={setAddingImages} />
      ) : removingImages ? (
        <RemoveImages
          recipeImages={images}
          removeImages={removeImages}
          close={setRemovingImages}
        />
      ) : (
        <React.Fragment>
          <NavBar
            color="transparent"
            brand="The Mark Cookbook."
            brandLink="http://localhost:3000/home"
            fixed
            rightLinks={
              <NavBarLinks
                category={category}
                openUpdateWindow={() => setUpdating((prevState) => !prevState)}
                openAddImagesWindow={() =>
                  setAddingImages((prevState) => !prevState)
                }
                imagesLength={recipe.images.length}
                openRemoveImagesWindow={() =>
                  setRemovingImages((prevState) => !prevState)
                }
              />
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
                <h1 className={classes.title}>{recipeName}</h1>
              </Grid>
            </Grid>
          </div>
          <Container style={{ padding: '0' }}>
            <Box my={2}>
              <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                  {isDeleted ? <p className={classes.hidden}>РЕЦЕПТАТА Е СКРИТА!</p> : null}
                  <div>
                    <div className={classes.smallContainer}>
                      <h2 className={classes.subtitle}>Необходими продукти:</h2>

                      {ingredients.map((ingredient) => (
                        <p key={ingredient.recipeIngredientID}>
                          {ingredient.amount} {ingredient.measure}{' '}
                          {ingredient.ingredient}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className={classes.smallContainer}>
                    <h2 className={classes.subtitle}>Инструкции:</h2>
                    <p style={{ padding: '0 5%' }}>{instructions}</p>
                  </div>
                  {images.length > 0 && <Carousel className={classes.carousel} images={images} />}
                  <p className={classes.date}>{`Добавена на: ${moment(new Date(addDate)).format('ll')} г.`}</p>

                </div>
              </div>
            </Box>
          </Container>
        </React.Fragment>
      )}
    </>
  );
};

export default SingleRecipe;
