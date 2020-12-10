import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SingleRecipe from '../../../components/Recipes/SingleRecipe/SingleRecipe';

const SingleRecipeContainer = () => {
  const { recipeID } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    setRecipe({ loading: true, data: null, error: null });

    fetch(`http://localhost:5000/recipes/${recipeID}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((result) => {
        setRecipe({ loading: false, data: result, error: null });
      })
      .catch((error) => {
        setRecipe({ loading: false, data: null, error: error });
      });
  }, [recipeID]);

  const handleAddImages = (filesData) => {
    setRecipe({ ...recipe, loading: true });

    fetch(`http://localhost:5000/recipes/${recipeID}/images`, {
      method: 'POST',
      body: filesData,
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((result) => {
        const recipeCopy = { ...recipe };
        recipeCopy.data.images = [...recipeCopy.data.images, ...result]; // cant find new photos
        recipe.loading = false;
        setRecipe(recipeCopy);
      })
      .catch((error) => {
        setRecipe({ loading: false, data: null, error: error });
      });
  };

  const handleUpdateRecipe = (recipeData) => {
    setRecipe({ loading: true, data: null, error: null });

    fetch(`http://localhost:5000/recipes/${recipeID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((result) => {
        setRecipe({ loading: false, data: result, error: null });
      })
      .catch((error) => {
        setRecipe({ loading: false, data: null, error: error });
      });
  };

  return (
    <>
      {recipe.error ? (
        <h4>{recipe.error.message}</h4>
      ) : recipe.loading ? (
        <h4>Loading...</h4>
      ) : (
        <SingleRecipe recipe={recipe.data} updateRecipe={handleUpdateRecipe} addImages={handleAddImages} />
      )}
    </>
  );
};

export default SingleRecipeContainer;
