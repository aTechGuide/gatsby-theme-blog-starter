import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {CssBaseline, Grid, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from "./header"
import Footer from './Footer';
import '../styles/index.scss';

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

  return (
      <div className={classes.root}>
        <CssBaseline />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <Container component="main" className={classes.main} maxWidth="lg">
          <Header siteTitle={data.site.siteMetadata.title} />
          <Grid container spacing={data.site.siteMetadata.gridSpacing}>
            <Grid item xs={12}>
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
