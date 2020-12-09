import { useState, useEffect } from 'react';
import useQueryParams from '../../../custom-hooks/useQueryParams.js';
import AllRecipes from '../../../components/Recipes/AllRecipes/AllRecipes';
import { useHistory } from 'react-router-dom';

const AllRecipesContainer = () => {
  const { category } = useQueryParams();
  const history = useHistory();

  const [recipes, setRecipes] = useState({
    loading: true,
    data: null,
    error: null,
  });

  if (!category) {
    useEffect(() => {
      setRecipes({ loading: true, data: null, error: null });

      fetch('http://localhost:5000/recipes', {
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
          setRecipes({ loading: false, data: result, error: null });
        })
        .catch((error) => {
          setRecipes({ loading: false, data: null, error: error });
        });
    }, []);
  }
  if (category) {
    useEffect(() => {
      setRecipes({ loading: true, data: null, error: null });

      fetch(`http://localhost:5000/recipes?category=${category}`, {
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
          setRecipes({ loading: false, data: result, error: null });
        })
        .catch((error) => {
          setRecipes({ loading: false, data: null, error: error });
        });
    }, [category]);
  }

  const handleCreateRecipe = (recipeData) => {
    setRecipes({ loading: true, data: null, error: null });

    fetch('http://localhost:5000/recipes', {
      method: 'POST',
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
        history.push(`/recipe/${result.recipeID}`);
      })
      .catch((error) => {
        setRecipes({ loading: false, data: null, error: error });
      });
  };

  return (
    <>
      {recipes.error ? (
        <h4>{recipes.error.message}</h4>
      ) : recipes.loading ? (
        <h4>Loading...</h4>
      ) : (
        <AllRecipes recipes={recipes.data} createRecipe={handleCreateRecipe} />
      )}
    </>
  );
};

export default AllRecipesContainer;
