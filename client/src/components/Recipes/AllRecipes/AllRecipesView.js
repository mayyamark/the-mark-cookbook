import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import noImage from './img/no-image.png';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '30px',
    opacity: '0.8',
    paddingTop: '2%',
    paddingBottom: '2%',
    textAlign: 'center',
    marginTop: '3%',
    fontWeight: 700,
    '&:hover': {
      opacity: 1,
      borderRadius: '6px',
      textShadow: '2px 2px 8px gray',
      boxShadow:
        '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#3C4858',
    fontSize: '1.5rem',
  },
  image: {
    width: '100%',
    paddingTop: '10px',
  },
}));

const AllRecipesView = ({ recipe }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} md={4} className={classes.grid}>
      <Link to={`/recipe/${recipe.recipeID}`} className={classes.link}>
        {recipe.recipeName}
        {recipe.images.length > 0 ? (
          <img
            key={recipe.images[0].imageID}
            className={classes.image}
            src={`http://localhost:5000/images/${recipe.images[0].imageName}`}
            alt="image"
          />
        ) : (
          <img
            key={recipe.recipeID}
            className={classes.image}
            src={noImage}
            alt="image"
          />
        )}
      </Link>
    </Grid>
  );
};

export default AllRecipesView;
