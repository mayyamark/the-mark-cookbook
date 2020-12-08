import useGetData from '../../custom-hooks/useGetData';
import Categories from '../../components/Categories/Categories/Categories';

const CategoriesContainer = () => {
  const { data, loading, error } = useGetData(
    'http://localhost:5000/categories',
  );

  return (
    <>
      {error ? (
        <h4>{error.message}</h4>
      ) : loading ? (
        <h4>Loading...</h4>
      ) : (
        <Categories categories={data} />
      )}
    </>
  );
};

export default CategoriesContainer;
