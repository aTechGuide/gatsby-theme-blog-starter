import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import PostSnippet from '../components/post/PostSnippet';

import { Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  postGridItem: {
    padding: theme.spacing(2)
  }
}));

const tagPosts = ({data, pageContext}) => {
  const classes = useStyles();

  const {tag} = pageContext;
  const { totalCount } = data.allMarkdownRemark

  const pageHeader = `${totalCount} post${totalCount === 1 ?  '' : 's'} tagged with "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
      <Grid container justify='center' >
        {data.allMarkdownRemark.edges.map(({node}) => (
          <Grid key={node.id} item className={classes.postGridItem}>
            <PostSnippet 
              key={node.id} 
              title={node.frontmatter.title}
              slug={node.frontmatter.slug}
              author={node.frontmatter.author}
              date={node.frontmatter.date}
              body={node.excerpt}
              tags={node.frontmatter.tags}
              //fluid={node.frontmatter.image.childImageSharp.fluid}
              fixed={node.frontmatter.image.childImageSharp.fixed}
              />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export const tagQuery = graphql`
    query($tag: String!){
      site {
        siteMetadata {
          gridSpacing
        }
      }
      allMarkdownRemark (
        sort: {fields: [frontmatter___date], order: DESC}
        filter: { frontmatter: {tags: { in: [$tag]} } }
      ) {
          totalCount
          edges {
            node {
              id 
              frontmatter {
                title
                date(formatString: "MMM Do YYYY")
                author
                tags
                slug
                image {
                  childImageSharp {
                    fixed(width: 350) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
              excerpt
            }
          }
      }
      
    }

`

export default tagPosts;