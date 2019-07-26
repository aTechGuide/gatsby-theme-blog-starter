import React from 'react';

import {Grid, IconButton} from '@material-ui/core';
import {ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Link } from 'gatsby';
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

  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage = currentPage - 1 === 1 ? '/' : '/page/' + (currentPage - 1).toString()

  const nextPage = '/page/' + (currentPage + 1).toString()
  
  return (
    <Grid container alignItems="center">
      <Grid item>
        {
          isFirst ? (
          <IconButton href="/" disabled>
            <ArrowBackIos />
          </IconButton>
          ) : (
          <IconButton href={previousPage} >
            <ArrowBackIos />
          </IconButton>
          ) 
        }
      </Grid>
      
        {Array.from({length: numberOfPages}, (_, i) => 
          currentPage === i + 1 ? (
            <Grid item key={`page-number${i + 1}`} className={classes.postGridItem} >
              <Link to={`/${i === 0 ? '': 'page/' + (i + 1) }`} activeClassName={classes.activeLink}>{i + 1}</Link>
            </Grid>
          ) : (
            <Grid item key={`page-number${i + 1}`} className={classes.postGridItem}>
              <Link to={`/${i === 0 ? '': 'page/' + (i + 1) }`}>{i + 1}</Link>
            </Grid>
          )
        ) }

      <Grid item>
        {
          isLast ? (
          <IconButton href={nextPage} disabled >
            <ArrowForwardIos />
          </IconButton>
          ) : (
          <IconButton href={nextPage} >
            <ArrowForwardIos />
          </IconButton>
          )
        }
      </Grid>
    </Grid>
  );
}

export default PaginationLinks;