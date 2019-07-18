import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {CssBaseline, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from "./header"
import Footer from './Footer';
import '../styles/index.scss';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Layout = ({ authorImageFluid, children, pageTitle, postAuthor }) => {
  // const classes = useStyles();
  // authorImageFluid and postAuthor used to be passed in Sidebar component
  

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
      <Grid container spacing={2} style={{marginTop: 64}}>
       
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
