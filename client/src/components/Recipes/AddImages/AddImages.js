import React, { useState } from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
    width: '56%',
  },
  cancelButton: {
    marginLeft: '2%',
  },
  icon: {
    marginRight: '3px',
  },
}));

const AddImages = ({ sendImages, close }) => {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);

  const send = (ev) => {
    ev.preventDefault();

    const filesData = new FormData();

    for (let i = 0; i < files.length; i++) {
      filesData.append('images', files[i]);
    }

    sendImages(filesData);
    close(false);
  };

  const handleChange = (ev) => {
    const filesCopy = [...files];
    const urlsCopy = [...urls];

    for (let i = 0; i < ev.target.files.length; i++) {
      filesCopy.push(ev.target.files[i]);
      urlsCopy.push(URL.createObjectURL(ev.target.files[i]));
    }

    setFiles(filesCopy);
    setUrls(urlsCopy);
  };

  return (
    <div className={classes.formContainer}>
      <form noValidate autoComplete="off" onSubmit={send}>
        <ThemeProvider theme={theme}>
          {urls.length > 0 ? (
            <React.Fragment>
              <h2 className={classes.title}>Избрани снимки:</h2>
              <Grid container>
                {urls.map((url, index) => {
                  return (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={12}
                      md={4}
                      className={classes.grid}
                    >
                      <img
                        className={classes.image}
                        src={url}
                        id={index}
                        alt="img"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </React.Fragment>
          ) : null}
          <input
            type="file"
            multiple
            id="contained-button-file"
            className={classes.fileInput}
            onChange={handleChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              className={classes.customInput}
              variant="outlined"
              color="primary"
              size="large"
              component="span"
            >
              <PhotoCamera className={classes.icon} />
              {files.length === 0 ? 'Избери снимки' : 'Добави още'}
            </Button>
          </label>
          <div className={classes.buttonContainer} >
            {files.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                className={classes.sendButton}
                size="large"
                disabled={!files}
                onClick={send}
              >
                Изпрати
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.cancelButton}
              onClick={() => close()}
            >
              Отказ
            </Button>
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default AddImages;
