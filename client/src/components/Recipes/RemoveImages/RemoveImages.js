import { useState } from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00acc1',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  formContainer: {
    textAlign: '-webkit-center',
    padding: '5% 0 10% 0',
  },
  grid: {
    padding: '30px',
    paddingBottom: '2%',
  },
  title: {
    color: '#3C4858',
    fontWeight: '700',
    fontFamily: '"Roboto Slab", "Times New Roman", serif',
    minHeight: '32px',
    fontSize: '1.6rem',
    textAlign: 'center',
  },
  fileInput: {
    display: 'none',
  },
  customInput: {
    width: '20%',
  },
  image: {
    width: '100%',
  },
  buttonContainer: {
    width: '20%',
    marginTop: '1%',
  },
  sendButton: {
    color: 'white',
  },
  cancelButton: {
    marginLeft: '2%',
  },
  icon: {
    marginRight: '3px',
  },
}));

const RemoveImages = ({ recipeImages, removeImages, close }) => {
  const classes = useStyles();

  const [images, setImages] = useState(recipeImages);
  const [imagesIDs, setImagesIDs] = useState([]);

  const remove = (ev) => {
    ev.preventDefault();

    if (imagesIDs.length > 0) {
      const sendData = imagesIDs.filter((id) => id !== 0);
      removeImages(sendData);
      close(false);
    }
  };
  console.log(imagesIDs);
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
    <div className={classes.formContainer}>
      <form autoComplete="off" noValidate onSubmit={remove}>
        <ThemeProvider theme={theme}>
          <h2 className={classes.title}>Снимки:</h2>
          <Grid container>
            {images.map((image) => (
              <Grid
                item
                key={image.imageID}
                xs={12}
                sm={12}
                md={4}
                className={classes.grid}
              >
                <img
                  className={classes.image}
                  src={`http://localhost:5000/images/${image.imageName}`}
                  alt="image"
                />
                <Button
                  color="secondary"
                  variant="outlined"
                  id={image.imageID}
                  onClick={handleImageChange}
                >
                  Премахни
                </Button>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.sendButton}
            disabled={!imagesIDs.length}
            onClick={remove}
          >
            Запази промените
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default RemoveImages;
