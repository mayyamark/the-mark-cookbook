import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../components/Common/LoadingSpinner/LoadingSpinner';
import SingleRecipe from '../../../components/Recipes/SingleRecipe/SingleRecipe';

const SingleRecipeContainer = () => {
  const { recipeID } = useParams();

  const [recipe, setRecipe] = useState({
    loading: true,
    data: { recipe: null, categories: null, measures: null },
    error: null,
  });

  useEffect(() => {
    setRecipe({ loading: true, data: null, error: null });

    Promise.allSettled([
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
          const recipeCopy = { ...recipe };
          recipeCopy.data.recipe = result;
          setRecipe(recipeCopy);
        }),

      fetch('http://localhost:5000/categories', {
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
          const recipeCopy = { ...recipe };
          recipeCopy.data.categories = result;
          setRecipe(recipeCopy);
        }),
      fetch('http://localhost:5000/measures', {
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
          const recipeCopy = { ...recipe };
          recipeCopy.data.measures = result;
          setRecipe(recipeCopy);
        }),
    ])
      .catch((error) => {
        setRecipe({ loading: false, data: null, error: error });
      })
      .finally(() => setRecipe({ ...recipe, loading: false }));
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
        recipeCopy.data.recipe.images = [...recipeCopy.data.images, ...result]; // cant find new photos
        recipeCopy.loading = false;
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
        const recipeCopy = { ...recipe };
        recipeCopy.data.recipe = result;
        recipeCopy.loading = false;
        setRecipe(recipeCopy);
      })
      .catch((error) => {
        setRecipe({ loading: false, data: null, error: error });
      });
  };

  const handleRemoveImages = (imagesIDs) => {
    setRecipe({ ...recipe, loading: true });

    fetch(`http://localhost:5000/recipes/${recipeID}/images`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imagesIDs),
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

        recipeCopy.data.recipe.images = result.available;
        recipeCopy.loading = false;
        setRecipe(recipeCopy);
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
        <LoadingSpinner />
      ) : (
        <SingleRecipe
          recipe={recipe.data.recipe}
          categories={recipe.data.categories}
          measures={recipe.data.measures}
          updateRecipe={handleUpdateRecipe}
          addImages={handleAddImages}
          removeImages={handleRemoveImages}
        />
      )}
    </>
  );
};

export default SingleRecipeContainer;
