import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import Img from 'gatsby-image';
import {Link, navigate} from 'gatsby';

import Context from './Context';

const useStyles = makeStyles(theme => ({
  logo: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  logoClick: {
    display: 'inline-block',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  footer: {
    padding: theme.spacing(1),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.dark,
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  '@media (min-width: 1024px)': {
    footer: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  text: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(2)
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
  const contextData = useContext(Context)

  return (
    <footer className={classes.footer}>
      <div className={classes.logo}>
        <div className={classes.logoClick} onClick={() => navigate('/')}>
          <Img fixed={contextData.icon.file.childImageSharp.fixed} className="App-logo" />
        </div>
      </div> 
      <Typography>
          <Link className={classes.menuLink} activeClassName={classes.activeLink} to="/arabic-grammar-tutorials-in-english/">About</Link>
      </Typography>
      <Typography>
        <Link className={classes.menuLink} activeClassName={classes.activeLink} to="/terms-of-use/">Terms of Use</Link>
      </Typography>
      <Typography>
        <Link className={classes.menuLink} activeClassName={classes.activeLink} to="/privacy-policy/">Privacy Policy</Link>
      </Typography>
      <Typography variant="body1" className={classes.text}>
        Proudly Powered by {' '}
        <a className={classes.textLink} href="https://www.gatsbyjs.org/">Gatsby,</a> {' '}
        <a className={classes.textLink} href="https://material-ui.com/">Material UI</a> and {' '}
        <a className={classes.textLink} href="https://www.netlify.com/">Netlify</a>
      </Typography>
    </footer>
  );
}


export default Footer;