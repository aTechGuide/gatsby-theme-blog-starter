import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import {slugify} from '../util/UtilityFunctions';

import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Typography, Button, CardHeader, Card, CardActionArea,CardActions,CardContent, Chip} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  chiprow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
  card: {
    width: 350,
    height: 420
  },
  cardActionArea: {
    height: 370
  }
}));

const Post = ({title, author, slug, date, body, fluid, tags}) => {

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea href={"/" + slug} className={classes.cardActionArea}>
        <Img fluid={fluid}/>
        <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            AB
          </Avatar>
        }
        title={title}
        subheader={date}
      />
        <CardContent>    
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.chiprow}>
        <div >
          {tags.map(tag => (
            <Link key={tag} to={`/tag/${slugify(tag)}`}>
              <Chip size='small' color='primary' label={tag} className={classes.chip} />
            </Link>
            ))}
        </div>
        <Button href={"/" + slug} size="small" color="primary" variant='outlined'>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;