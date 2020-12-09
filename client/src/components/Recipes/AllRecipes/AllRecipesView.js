import { Link } from 'react-router-dom';

const AllRecipesView = ({ recipe }) => {
  return (
    <li>
      <Link to={`/recipe/${recipe.recipeID}`}>{recipe.recipeName}</Link>
      <div>
        {recipe.images.map((image) => (
          <img
            key={image.imageID}
            src={
              require(`../../../../../server/images/${image.imageName}`).default
            }
            alt="image"
          />
        ))}
      </div>
    </li>
  );
};

export default AllRecipesView;
