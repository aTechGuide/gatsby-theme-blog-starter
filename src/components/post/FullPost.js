import React from 'react';
import {Avatar, CardHeader, Card,CardActions,CardContent, Chip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';

import {slugify} from '../../util/UtilityFunctions';

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
    maxWidth: '80%',
    margin: 'auto'
  }
}));

const FullPost = ({data}) => {
  const classes = useStyles();

  const post = data.markdownRemark.frontmatter;

  return (
    <Card>
      
      {/* <Img fluid={post.image.childImageSharp.fluid}/> */}
      <CardHeader
        avatar={<Avatar aria-label="Recipe" className={classes.avatar}>AB</Avatar>}
        title={post.title}
        subheader={post.date}
        titleTypographyProps={{component: 'h1'}}
      />
      <CardContent>    
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </CardContent>
      
      <CardActions className={classes.chiprow}>
        <div >
          {post.tags.map(tag => (
            <Link key={tag} to={`/tag/${slugify(tag)}`}>
              <Chip size='small' color='primary' label={tag} className={classes.chip} />
            </Link>
            ))}
        </div>
      </CardActions>
    </Card>
  );
}

export default FullPost;