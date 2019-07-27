import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import Img from 'gatsby-image';
import {Link} from 'gatsby';

import {Consumer} from './../context/context';

const useStyles = makeStyles(theme => ({
  logo: {
    flexGrow: 1
  },
  footer: {
    padding: theme.spacing(1),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.dark,
    width: '100%'
  },
  text: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2)
  },
  textLink: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  menuLink: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2),
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  activeLink: {
    background: theme.palette.primary.light,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    '&:hover': {
      color: 'white'
    }
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Consumer>
      {
        value => (
          <Grid container className={classes.footer} alignItems='center' >
            <Grid item className={classes.logo}>
              <Img fixed={value.icon.file.childImageSharp.fixed} className="App-logo" />        
            </Grid>
            <Grid item>
              <Typography>
                <Link className={classes.menuLink} activeClassName={classes.activeLink} to="/terms-of-use">Terms of Use</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Link className={classes.menuLink} activeClassName={classes.activeLink} to="/privacy-policy">Privacy Policy</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.text}>
                Proudly Powered by {' '}
                <a class={classes.textLink} href="https://www.gatsbyjs.org/">Gatsby</a> and {' '}
                <a className={classes.textLink} href="https://www.netlify.com/">Netlify</a>
              </Typography>
            </Grid> 
          </Grid>
        )
      }
    </Consumer>
  );
}


export default Footer;