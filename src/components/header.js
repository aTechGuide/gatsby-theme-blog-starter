import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'gatsby';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  homeLink: {
    color: theme.palette.primary.contrastText
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

const Header = () => {
  const classes = useStyles();

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component='h1' className={classes.title}>
            <Link className={classes.homeLink} to="/">Arabic Blog</Link>
          </Typography>
          <Typography>
            <Link className={classes.menuLink} activeClassName={classes.activeLink} to="/tags">Tags</Link>
          </Typography>
          {/* <Typography>
            <Link className={classes.menuLink} activeClassName={classes.activeLink} to="/about">About</Link>
          </Typography> */}
        </Toolbar>
      </AppBar>
  );
}

export default Header
