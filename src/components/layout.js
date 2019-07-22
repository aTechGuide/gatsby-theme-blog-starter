import React from "react"
import PropTypes from "prop-types"
import {CssBaseline} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './Footer';
import Header from "./header"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.light,
    width: '100%'
  },
}));

const Layout = ({ children, pageTitle }) => {
  const classes = useStyles();

  return (
      <>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
        
        {children}

        <footer className={classes.footer}>
          <Footer />
        </footer>
    </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
