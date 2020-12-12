import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  cardBody: {
    padding: '0.9375rem 1.875rem',
    flex: '1 1 auto',
  },
}));

const CardBody = (props) => {
  const classes = useStyles();
  const { className, children, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className]: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;