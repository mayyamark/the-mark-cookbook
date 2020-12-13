import React from 'react';
import { Slide } from 'react-slideshow-image';
import './Carousel.css';
import 'react-slideshow-image/dist/styles.css';

const Carousel = (props) => {
  const { images } = props;

  return (
    <div>
      <Slide easing="ease">
        {images.map((image) => {
          return (
            <div key={image.imageID} className="each-slide">
              <div
                style={{
                  backgroundImage: `url(http://localhost:5000/images/${image.imageName})`,
                }}
              >
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default Carousel;
