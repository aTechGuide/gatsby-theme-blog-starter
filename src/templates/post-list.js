import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import IndexPageGrid from '../components/IndexPageGrid';
import Seo from "../components/seo/Seo"

/**
 * This Template is used to generate pages for Pagination
 */

const postList = ({data, pageContext}) => {

  const posts = data.allMdx.edges
  const {currentPage, numberOfPages} = pageContext
  
  return (
    <Layout pageTitle={`Page: ${currentPage}`}>
      <Seo 
        title="Arabic Blog"
        description={`Arabic Blog ${currentPage} page.`}
        slug={`/page/${currentPage}`} />
      
      <IndexPageGrid 
        posts={posts}
        currentPage={currentPage}
        numberOfPages={numberOfPages} />
      
    </Layout>
  );
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMdx (
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id 
          frontmatter {
            ...PostFrontMatter
          }
        }
      }
    }
  }
`

export default postList;