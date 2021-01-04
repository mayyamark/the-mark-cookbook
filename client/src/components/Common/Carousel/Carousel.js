import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slide } from 'react-slideshow-image';
import './Carousel.css';
import 'react-slideshow-image/dist/styles.css';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '60%',
    margin: 'auto auto',
  },
}));

const Carousel = ({ images }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
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
