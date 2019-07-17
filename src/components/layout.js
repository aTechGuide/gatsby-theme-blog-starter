import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {Typography, CssBaseline, Grid} from '@material-ui/core';

import Header from "./header"
import Footer from './Footer';
import '../styles/index.scss';

import Sidebar from "./Sidebar";

const Layout = ({ authorImageFluid, children, pageTitle, postAuthor }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <CssBaseline />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1">
            {pageTitle}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
