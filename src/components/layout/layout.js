import React from "react"
import PropTypes from "prop-types"
import {CssBaseline} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {deepPurple, red, indigo, yellow, cyan, lightGreen} from '@material-ui/core/colors/';

import Footer from '../Footer';
import Header from "../header"

/**
 * This class is Parent to all the components
 * Here we've created a Top Level Theme provider which will pass down to all the components of the App
 */

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

let theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: red
  },
  typography: {
    fontSize: 16,
    h1 : {
      fontSize: "3rem",
      fontWeight: 500,
      color: deepPurple[700]
    }
  },
  postGridItemPadding: '16px',
  headingColor: indigo,
  highlightOne: yellow,
  highlightTwo: cyan,
  highlightThree: lightGreen
});

const Layout = ({ children, pageTitle }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
