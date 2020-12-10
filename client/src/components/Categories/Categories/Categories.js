import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateCategory from '../CreateCategory/CreateCategory';

const Categories = ({ categories, createCategory }) => {
  const [creating, setCreating] = useState(false);

  return (
    <>
      {creating ? (
        <CreateCategory sendCategory={createCategory} />
      ) : (
        <>
          <button onClick={() => setCreating((prevState) => !prevState)}>
            Добави категория
          </button>
          <ul>
            {categories.map((category) => {
              if (category.images.length > 0) {
                return (
                  <li key={category.categoryID}>
                    <Link to={`/recipes?category=${category.category}`}>
                      {category.category}
                    </Link>
                    <div>
                      {category.images.map((image) => (
                        <img
                          key={image.imageID}
                          src={`http://localhost:5000/images/${image.imageName}`}
                          alt="image"
                        />
                      ))}
                    </div>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default Categories;
