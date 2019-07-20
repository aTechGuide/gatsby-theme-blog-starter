import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {CssBaseline, Grid, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './Footer';
// import '../styles/index.scss';
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
    backgroundColor: 'white',
  },
}));

const Layout = ({ authorImageFluid, children, pageTitle, postAuthor }) => {
  const classes = useStyles();
  // authorImageFluid and postAuthor used to be passed in Sidebar component

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          gridSpacing
        }
      }
    }
  `)

  const space = parseInt(data.site.siteMetadata.gridSpacing);

  return (
      <div className={classes.root}>
        <Header />
        <CssBaseline />
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
        <Container component="main" className={classes.main} maxWidth="lg">
          <Grid container spacing={space}>
            <Grid item xs={12} md={12}>
              {children}
            </Grid>
          </Grid>
        </Container>
        <footer className={classes.footer}>
          <Footer />
        </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
