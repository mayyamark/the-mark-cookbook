import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  return (
    <>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryID}>
            <Link to={`/recipes?category=${category.category}`}>{category.category}</Link>
            <div>
              {category.images.map((image) => (
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

export default Categories;
