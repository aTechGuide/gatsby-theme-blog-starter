import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import IndexPageGrid from '../components/IndexPageGrid';

/**
 * This Template is used to generate pages for Pagination
 */

const postList = ({data, pageContext}) => {

  const posts = data.allMarkdownRemark.edges
  const {currentPage, numberOfPages} = pageContext
  
  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      
      <IndexPageGrid 
        posts={posts}
        currentPage={currentPage}
        numberOfPages={numberOfPages} />
      
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