import { useState, useEffect } from 'react';
import Categories from '../../components/Categories/Categories/Categories';

const CategoriesContainer = () => {
  const [categories, setCategories] = useState({
    loading: true,
    data: null,
    error: null,
  });
  console.log(categories);
  useEffect(() => {
    setCategories({ loading: true, data: null, error: null });

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
        setCategories({ loading: false, data: result, error: null });
      })
      .catch((error) => {
        setCategories({ loading: false, data: null, error: error });
      });
  }, []);


  const handleCreateCategory = (categoryData) => {
    setCategories({ ...categories, loading: true});

    fetch('http://localhost:5000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((result) => {
        const categoriesCopy = { ...categories };
        categoriesCopy.data.push(result);
        setCategories(categoriesCopy);
      })
      .catch((error) => {
        setCategories({ loading: false, data: null, error: error });
      });
  };


  return (
    <>
      {categories.error ? (
        <h4>{categories.error.message}</h4>
      ) : categories.loading ? (
        <h4>Loading...</h4>
      ) : (
        <Categories categories={categories.data} createCategory={handleCreateCategory} />
      )}
    </>
  );
};

export default CategoriesContainer;
