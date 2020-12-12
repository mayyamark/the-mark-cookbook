import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '../../Common/Card/Card.js';
import CardBody from '../../Common/Card/CardBody.js';
import CardFooter from '../../Common/Card/CardFooter.js';
import mayya from './img/mayya.jpg';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '40px 0',
    textAlign: 'center',
  },
  title: {
    color: '#3C4858',
    margin: '1.75rem 0 0.875rem',
    textDecoration: 'none',
    fontWeight: '700',
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    fontSize: '2.25rem',
  },
  imgFluid: {
    maxWidth: '100%',
    height: 'auto',
  },
  imgRounded: {
    borderRadius: '6px !important',
  },
  imgRoundedCircle: {
    borderRadius: '50% !important',
  },
  imgRaised: {
    boxShadow:
      '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  imgGallery: {
    width: '100%',
    marginBottom: '2.142rem',
  },
  imgCardTop: {
    width: '100%',
    borderTopLeftRadius: 'calc(.25rem - 1px)',
    borderTopRightRadius: 'calc(.25rem - 1px)',
  },
  imgCardBottom: {
    width: '100%',
    borderBottomLeftRadius: 'calc(.25rem - 1px)',
    borderBottomRightRadius: 'calc(.25rem - 1px)',
  },
  imgCard: {
    width: '100%',
    borderRadius: 'calc(.25rem - 1px)',
  },
  imgCardOverlay: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    padding: '1.25rem',
  },
  itemGrid: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '2% 5%',
  },
  cardTitle: {
    color: '#3C4858',
    margin: '1.75rem 0 0.875rem',
    textDecoration: 'none',
    fontWeight: '700',
    marginTop: '.625rem',
    fontSize: '1.125rem',
  },
  smallTitle: {
    color: '#6c757d',
    fontSize: '13px',
  },
  description: {
    color: '#999',
    fontSize: '15px',
  },
  justifyCenter: {
    justifyContent: 'center !important',
  },
  socials: {
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
    color: '#999',
  },
  margin5: {
    margin: '5px',
  },
}));

const AboutMeSection = () => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>А ето ме и мен:</h2>
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={4}>
            <Card plain>
              <Grid item xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={mayya} alt="..." className={imageClasses} />
              </Grid>
              <h4 className={classes.cardTitle}>
                Майя Ал. Маркова
                <br />
                <small className={classes.smallTitle}>
                  JavaScript Developer
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Майя, момичето със странното име... Завърших Alpha JavaScript
                  програмата на Telerik Academy, а няколко месеца по-рано се
                  дипломирах като инженер-химик. Освен това съм и световен
                  шампион по шотокан карате. И последно, но далеч не на последно
                  място, обожавам кулинарството.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  className={classes.margin5}
                  href="https://www.linkedin.com/in/mayya-markova/"
                  target="_blank"
                >
                  <i className={classes.socials + ' fab fa-linkedin'} />
                </Button>
                <Button
                  className={classes.margin5}
                  href="https://gitlab.com/mayya.markova"
                  target="_blank"
                >
                  <i className={classes.socials + ' fab fa-gitlab'} />
                </Button>
                <Button
                  className={classes.margin5}
                  href="https://www.facebook.com/markmayya"
                  target="_blank"
                >
                  <i className={classes.socials + ' fab fa-facebook'} />
                </Button>
                {/* <Button
                  className={classes.margin5}
                  href="https://www.instagram.com/mayyamark"
                  target="_blank"
                >
                  <i className={classes.socials + ' fab fa-instagram'} />
                </Button> */}
              </CardFooter>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AboutMeSection;
