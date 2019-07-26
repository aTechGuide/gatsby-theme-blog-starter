import React from 'react';
import PostSnippet from "../components/post/PostSnippet";
import PaginationLinks from '../components/PaginationLinks';
import { Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/**
 * This Grid is Used in Index page (index.js) + Paginated Pages (post-list.js)
 */
const useStyles = makeStyles(theme => ({
  postGridItem: {
    padding: theme.postGridItemPadding
  }
}));

const IndexPageGrid = ({posts, currentPage, numberOfPages}) => {
  const classes = useStyles();
  // const theme

  return (
    <Grid container justify='center' alignItems='center' direction='column'>
      <Grid item>
        <Grid container justify='center' >
          {posts.map(({node}) => (
            <Grid key={node.id} item className={classes.postGridItem} > 
              <PostSnippet 
                key={node.id}
                pagetitle={node.frontmatter.pagetitle} 
                author={node.frontmatter.author}
                slug={node.frontmatter.slug}
                date={node.frontmatter.date}
                body={node.excerpt}
                // fluid={node.frontmatter.image.childImageSharp.fluid}
                fixed={node.frontmatter.image.childImageSharp.fixed}
                tags={node.frontmatter.tags} />
              </Grid>
          ))}
          
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify='center' >
          <Grid item>
          <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default IndexPageGrid;