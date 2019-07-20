import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, Link} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link color="inherit" href="/">Arabic Blog</Link>
          </Typography>
          <Button href="/tags" color="inherit">Tags</Button>
        </Toolbar>
      </AppBar>
  );
}

export default Header
