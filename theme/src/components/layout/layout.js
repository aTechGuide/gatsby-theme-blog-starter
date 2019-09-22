import React from "react"
import PropTypes from "prop-types"
import {useStaticQuery, graphql} from 'gatsby';

import {CssBaseline} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Footer from '../Footer';
import Header from "../header"
import {Provider} from '../Context';
import theme from '../../theme';

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

const muiTheme = createMuiTheme(theme)

const Layout = ({ children }) => {
  const classes = useStyles();
  
  /**
   * Loding ICON which can be used everywhere
   */
  const icon = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fixed(width:60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Provider value={{icon}}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <Header />
          {children}
          <Footer/>
        </div>
      </ThemeProvider>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
