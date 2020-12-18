import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/Common/LoadingSpinner/LoadingSpinner';
import Categories from '../../components/Categories/Categories/Categories';
import CreateCategory from '../../components/Categories/CreateCategory/CreateCategory';

const CategoriesContainer = ({ isCreating }) => {
  const history = useHistory();

  const [categories, setCategories] = useState({
    loading: true,
    data: null,
    error: null,
  });

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
        Swal.fire({
          icon: 'success',
          title: `Категорията '${categoryData.categoryName}' беше създадена!`,
          showConfirmButton: false,
          timer: 1500,
        });
        history.push('/categories');
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
        <LoadingSpinner />
      ) : (
        isCreating ? <CreateCategory sendCategory={handleCreateCategory} />: <Categories categories={categories.data} />
      )}
    </>
  );
};

export default CategoriesContainer;
