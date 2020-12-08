import useGetData from '../../../custom-hooks/useGetData';
import { useParams } from 'react-router-dom';
import SingleRecipe from '../../../components/Recipes/SingleRecipe/SingleRecipe';

const SingleRecipeContainer = () => {
  const { recipeID } = useParams();

  const { data, loading, error } = useGetData(
    `http://localhost:5000/recipes/${recipeID}`,
  );

  return (
    <>
      {error ? (
        <h4>{error.message}</h4>
      ) : loading ? (
        <h4>Loading...</h4>
      ) : (
        <SingleRecipe recipe={data} />
      )}
    </>
  );
};

export default SingleRecipeContainer;
