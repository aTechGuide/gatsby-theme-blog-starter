import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    textTransform: 'capitalize'
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="body1">My sticky footer can be found here.</Typography>
    </Container>  
  );
}