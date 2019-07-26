import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    textTransform: 'capitalize'
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.light,
    width: '100%'
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="body1">My sticky footer can be found here.</Typography>
      </Container>  
    </footer>
  );
}