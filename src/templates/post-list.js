import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import Post from '../components/Post';
import PaginationLinks from '../components/PaginationLinks';
import { Grid} from '@material-ui/core';

const postList = ({data, pageContext}) => {
  const posts = data.allMarkdownRemark.edges
  const {currentPage, numberOfPages} = pageContext

  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      <Grid container spacing={1} justify='center' >
        {posts.map(({node}) => (
          <Grid key={node.id} item>
            <Post key={node.id} 
            slug={node.frontmatter.title}
            author={node.frontmatter.author}
            date={node.frontmatter.date}
            body={node.excerpt}
            tags={node.frontmatter.tags}
            fluid={node.frontmatter.image.childImageSharp.fluid}
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
            image {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 370) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields{
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default postList;