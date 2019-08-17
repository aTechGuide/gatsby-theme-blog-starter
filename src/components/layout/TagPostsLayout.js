import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PostSnippet from '../post/PostSnippet';

import { Grid} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  postGridItem: {
    padding: theme.postGridItemPadding
  }
}));

const TagPostsLayout = ({data, pageContext}) => {

  const classes = useStyles();

  return (
    <Grid container justify='center' >
        {data.allMarkdownRemark.edges.map(({node}) => (
          <Grid key={node.id} item className={classes.postGridItem}>
            <PostSnippet 
              key={node.id} 
              pagetitle={node.frontmatter.pagetitle}
              slug={node.frontmatter.slug}
              date={node.frontmatter.date}
              body={node.frontmatter.summary}
              //fluid={node.frontmatter.image.childImageSharp.fluid}
              fixed={node.frontmatter.image.childImageSharp.fixed}
              tags={node.frontmatter.tags}
              />
          </Grid>
        ))}
      </Grid>
  );
}

export default TagPostsLayout;