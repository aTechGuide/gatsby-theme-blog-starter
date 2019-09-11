import React from 'react';
import {useScrollTrigger, Zoom} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing(14),
    right: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing(2),
    }
  },
}));

const ScrollTop = ({ children }) => {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.button}>
        {children}
      </div>
    </Zoom>
  );
}

export default ScrollTop;