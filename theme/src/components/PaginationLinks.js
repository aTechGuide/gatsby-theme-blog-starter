import React from 'react';

import {Grid, IconButton, Tooltip} from '@material-ui/core';
import {ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return({
  activeLink: {
    fontWeight: 'bold',
    color: 'Red'
  },
  postGridItem: {
    padding: theme.postGridItemPadding
  }
})});

const PaginationLinks = ({currentPage, numberOfPages}) => {

  const classes = useStyles();

  const { site: {siteMetadata: {options: {basePath}}} } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            options {
              basePath
            }
          }
        }
      }
    `)

  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage = currentPage - 1 === 1 ? (basePath === "/" ? '/' : `/${basePath}/`) : 
    (basePath === "/" ? `/page/${(currentPage - 1).toString()}/` : `/${basePath}/page/${(currentPage - 1).toString()}/`)

  const nextPage = (basePath === "/" ? `/page/${(currentPage + 1).toString()}/` : `/${basePath}/page/${(currentPage + 1).toString()}/`)
  
  return (
    <Grid container alignItems="center" component="nav">
      <Grid item>
        {
          isFirst ? (
            <Tooltip title="Previous Page">
              <IconButton href={basePath === "/" ? "/" : `/${basePath}/`} disabled>
                <ArrowBackIos >Back</ ArrowBackIos>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Previous Page">
              <IconButton href={previousPage} >
                <ArrowBackIos >Back</ ArrowBackIos>
              </IconButton>
            </Tooltip>
          ) 
        }
      </Grid>
      
        {Array.from({length: numberOfPages}, (_, i) => 
          currentPage === i + 1 ? (
            <Grid item key={`page-number${i + 1}`} className={classes.postGridItem} >
              <Link to={basePath === "/" ? `${i === 0 ? '': '/page/' + (i + 1)}/` : `${i === 0 ? `/${basePath}/` : `/${basePath}/page/` + (i + 1)}/`} activeClassName={classes.activeLink}> {i + 1}</Link>
            </Grid>
          ) : (
            <Grid item key={`page-number${i + 1}`} className={classes.postGridItem}>
              <Link to={basePath === "/" ? `${i === 0 ? '': '/page/' + (i + 1) }/` : `${i === 0 ? `/${basePath}/` : `/${basePath}/page/` + (i + 1) }/`}> {i + 1}</Link>
            </Grid>
          )
        ) }

      <Grid item>
        {
          isLast ? (
            <Tooltip title="Next Page">
              <IconButton href={basePath === "/" ? "/" : `/${basePath}/`} disabled >
                <ArrowForwardIos />
              </IconButton >
            </Tooltip>
          ) : (
            <Tooltip title="Next Page">
              <IconButton href={nextPage} >
                <ArrowForwardIos />
              </IconButton>
            </Tooltip>
          )
        }
      </Grid>
    </Grid>
  );
}

export default PaginationLinks;