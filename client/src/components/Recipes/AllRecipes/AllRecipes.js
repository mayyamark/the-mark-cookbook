import { Link } from 'react-router-dom';

const AllRecipes = ({ recipes }) => {
  console.log(recipes);
  return (
    <>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipeID}>
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
        ))}
      </ul>
    </>
  );
};

export default AllRecipes;
