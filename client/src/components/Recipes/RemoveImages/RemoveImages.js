import { useState } from 'react';

const RemoveImages = ({ recipeImages, removeImages, close }) => {
  const [images, setImages] = useState(recipeImages);
  const [imagesIDs, setImagesIDs] = useState([]);

  const remove = (ev) => {
    ev.preventDefault();

    if (imagesIDs.length > 0) {
      removeImages(imagesIDs);
      close(false);
    }
  };

  const handleImageChange = (ev) => {
    ev.preventDefault();
    const { id } = ev.target;

    const imagesIDsCopy = [...imagesIDs];
    imagesIDsCopy.push(+id);
    setImagesIDs(imagesIDsCopy);

    const imagesCopy = images.filter((img) => img.imageID !== +id);
    setImages(imagesCopy);
  };

  return (
    <form onSubmit={remove}>
      <div>
        {images.map((image) => (
          <div key={image.imageID}>
            <img
              src={`http://localhost:5000/images/${image.imageName}`}
              alt="image"
            />
            <button id={image.imageID} onClick={handleImageChange}>Премахни</button>
          </div>
        ))}
      </div>
      <button disabled={!imagesIDs.length}>Изпрати промените</button>
    </form>
  );
};

export default RemoveImages;
