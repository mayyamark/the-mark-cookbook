import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  list: {
    fontSize: '14px',
    margin: 0,
    paddingLeft: '0',
    listStyle: 'none',
    paddingTop: '0',
    paddingBottom: '0',
    color: 'inherit',
  },
  listItem: {
    float: 'left',
    color: 'inherit',
    position: 'relative',
    display: 'block',
    width: 'auto',
    margin: '0',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '&:after': {
        width: 'calc(100% - 30px)',
        content: '""',
        display: 'block',
        height: '1px',
        marginLeft: '15px',
        backgroundColor: '#e5e5e5',
      },
    },
  },
  listItemText: {
    padding: '0 !important',
  },
  navLink: {
    color: 'inherit',
    position: 'relative',
    padding: '0.9375rem',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    '&:hover': {
      color: 'inherit',
      background: 'rgba(200, 200, 200, 0.2)',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 30px)',
      marginLeft: '15px',
      marginBottom: '8px',
      marginTop: '8px',
      textAlign: 'left',
      '& > span:first-child': {
        justifyContent: 'flex-start',
      },
    },
  },
  icons: {
    width: '20px',
    height: '20px',
    marginRight: '3px',
  },
  socialIcons: {
    position: 'relative',
    fontSize: '20px !important',
    marginRight: '4px',
  },
  tooltip: {
    padding: '10px 15px',
    minWidth: '130px',
    color: '#555555',
    lineHeight: '1.7em',
    background: '#FFFFFF',
    border: 'none',
    borderRadius: '3px',
    boxShadow:
      '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    maxWidth: '200px',
    textAlign: 'center',
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: '0.875em',
    fontStyle: 'normal',
    fontWeight: '400',
    textShadow: 'none',
    textTransform: 'none',
    letterSpacing: 'normal',
    wordBreak: 'normal',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'normal',
    lineBreak: 'auto',
  },
  marginRight5: {
    marginRight: '5px',
  },
}));

const NavBarLinks = (props) => {
  // const { openCreateWindow } = props;
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          title="Виж всички рецепти, независимо от категорията!"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button href="http://localhost:3000/recipes" className={classes.navLink}>
            <i className="fas fa-utensils" style={{ marginRight: '5px' }} />
            Всички рецепти
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          title="Не намираш тази, която търсиш? Създай я!"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="http://localhost:3000/create-category"
            className={classes.navLink}>
            <i className="fas fa-pencil-alt" style={{ marginRight: '5px' }} />
            Нова категория
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default NavBarLinks;
