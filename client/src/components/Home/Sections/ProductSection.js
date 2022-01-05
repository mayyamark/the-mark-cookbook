import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import InfoArea from '../../Common/InfoArea/InfoArea.js';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '70px 0',
    textAlign: 'center',
  },
  title: {
    color: '#3C4858',
    margin: '1.75rem 0 0.875rem',
    textDecoration: 'none',
    fontWeight: '700',
    fontFamily: '"Roboto Slab", "Times New Roman", serif',
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    fontSize: '2.25rem',
    lineHeight: '1.5em',
  },
  description: {
    color: '#999',
    fontWeight: '300',
    fontSize: '1.1rem',
    padding: '5%',
  },
  grid: {
    '&:hover': {
      borderRadius: '6px',
      boxShadow:
        '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    },
  },
}));

const ProductSection = () => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Какво е това приложение?</h2>
          <h5 className={classes.description}>
            Това е уеб приложение за търсене на вкусни рецепти! Можеш да откриеш
            различни рецепти според категорията им, да добавяш нови категории и
            рецепти или да променяш текущите! Имаш и възможността да добавяш и
            премахваш снимки!
          </h5>
        </Grid>
      </Grid>
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} className={classes.grid}>
            <InfoArea
              title="Първи самостоятелен проект"
              description="Създадох това приложение веднага след завършването ми на Alpha JavaScript програмата на Telerik Academy. След 3 групови проекта, усвоих солидни знания и сега с радост представям първия си самостоятелен проект!"
              icon={EmojiEventsIcon}
              iconColor="#4caf50"
              vertical
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.grid}>
            <InfoArea
              title="Back-end"
              description="Back-end частта на приложението спазва REST-стандарта. Приложих многослойна архитектура. За изграждане на server API използвах Express, а като connector-библиотека- MariaDB. За менажиране на снимките приложих Multer."
              icon={AccountTreeIcon}
              iconColor="#f50057"
              vertical
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.grid}>
            <InfoArea
              title="Front-end"
              description="В основата на front-end частта стои една от най-популярните JavaScript библиотеки, React. Дизайнът на приложението постигнах с помощтта на Material UI и SweetAlert2."
              icon={ColorLensIcon}
              iconColor="#00acc1"
              vertical
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProductSection;
