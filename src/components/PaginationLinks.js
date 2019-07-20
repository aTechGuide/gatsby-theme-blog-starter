import React from 'react';

import {Grid, IconButton, Button} from '@material-ui/core';
import {ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const PaginationLinks = ({currentPage, numberOfPages}) => {

  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage = currentPage - 1 === 1 ? '/' : '/page/' + (currentPage - 1).toString()

  const nextPage = '/page/' + (currentPage + 1).toString()
  
  return (
    <Grid container spacing={1} alignItems="center">
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
            <Grid item key={`page-number${i + 1}`}>
              <Button variant="contained" href={`/${i === 0 ? '': 'page/' + (i + 1) }`} size="small" color="primary"> {i + 1} </Button>
            </Grid>
          ) : (
            <Grid item key={`page-number${i + 1}`}>
              <Button href={`/${i === 0 ? '': 'page/' + (i + 1) }`} variant="outlined" size="small" color="primary"> {i + 1} </Button>
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