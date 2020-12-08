import useGetData from '../../../custom-hooks/useGetData';
import useQueryParams from '../../../custom-hooks/useQueryParams.js';
import AllRecipes from '../../../components/Recipes/AllRecipes/AllRecipes';

const AllRecipesContainer = () => {
  const { category } = useQueryParams();
  console.log(category);
  const { data, loading, error } = useGetData(
    `http://localhost:5000/recipes?category=${category}`,
  );

  return (
    <>
      {error ? (
        <h4>{error.message}</h4>
      ) : loading ? (
        <h4>Loading...</h4>
      ) : (
        <AllRecipes recipes={data} />
      )}
    </>
  );
};

export default AllRecipesContainer;
