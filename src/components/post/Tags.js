import React from 'react';
import {navigate} from 'gatsby';
import {Chip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {slugify} from '../../util/UtilityFunctions';

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(1),
  }
}));

const Tags = ({tags}) => {
  const classes = useStyles();

  return (
    tags.map(tag => (
      <Chip key={tag} size='small' color='primary' label={tag} className={classes.chip} 
        clickable onClick={() => navigate(`/tag/${slugify(tag)}/`) } />
      ))
  );
}

export default Tags;