import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import PostSnippet from '../components/post/PostSnippet';
import PaginationLinks from '../components/PaginationLinks';
import { Grid} from '@material-ui/core';

/**
 * This Template is used to generate pages for Pagination
 */
const postList = ({data, pageContext}) => {
  const posts = data.allMarkdownRemark.edges
  const {currentPage, numberOfPages} = pageContext
  
  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      <Grid container spacing={1} justify='center' >
        {posts.map(({node}) => (
          <Grid key={node.id} item>
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
        )) }
      </Grid>
      <Grid container spacing={1} justify='center' >
        <Grid item>
          <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages} />
        </Grid>
      </Grid>
      
    </Layout>
  );
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark (
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
    ) {
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

export default postList;