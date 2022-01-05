import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  infoArea: {
    maxWidth: '300px',
    margin: '0 auto',
    padding: '11px 0',
  },
  iconWrapper: {
    float: 'left',
    marginTop: '24px',
    marginRight: '10px',
  },
  icon: {
    width: '36px',
    height: '36px',
  },
  descriptionWrapper: {
    color: 'gray',
    overflow: 'hidden',
  },
  title: {
    color: '#3C4858',
    margin: '1.75rem 0 0.875rem',
    textDecoration: 'none',
    fontWeight: '700',
    fontFamily: '"Roboto Slab", "Times New Roman", serif',
    fontSize: '1.125rem',
    lineHeight: '1.5em',
  },
  description: {
    color: 'gray',
    overflow: 'hidden',
    margin: '0 0 10px',
    fontSize: '16px',
  },
  iconWrapperVertical: {
    float: 'none',
  },
  iconVertical: {
    width: '61px',
    height: '61px',
  },
}));

const InfoArea = (props) => {
  const classes = useStyles();
  const { title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical,
  });
  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper} style={{ color: iconColor }}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
};

export default InfoArea;
