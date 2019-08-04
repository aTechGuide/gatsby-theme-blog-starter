import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from "@material-ui/core";
import SEO from '../seo/Seo';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  }
}));

const PageLayout = ({children, title}) => {
  const classes = useStyles()

  return (
    <>
      <SEO title={title} />
      <Container className={classes.container} >
        <Typography variant='h1' align='center'>
            {title}
        </Typography>
        {children}
      </Container>
    </>
    
  );
}

export default PageLayout;