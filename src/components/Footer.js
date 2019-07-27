import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  logo: {
    flexGrow: 1
  },
  footer: {
    padding: theme.spacing(1),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.light,
    width: '100%'
  }
}));

const Footer = ({icon}) => {
  const classes = useStyles();
  console.log(icon);

  return (
    <Grid container className={classes.footer} alignItems='center' >
      <Grid item className={classes.logo}>
        <Img fixed={icon.file.childImageSharp.fixed} className="App-logo" />        
      </Grid>
      
      <Grid item>
        <Typography variant="body1">Proudly Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a> and <a href="https://www.netlify.com/">Netlify</a></Typography>
      </Grid> 
    </Grid>
  );
}


export default Footer;