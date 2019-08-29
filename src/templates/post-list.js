import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import IndexPageGrid from '../components/IndexPageGrid';
import Seo from "../components/seo/Seo"

/**
 * This Template is used to generate pages for Pagination
 */

const PostList = ({data, pageContext}) => {

  const posts = data.allMdx.edges
  const title = data.site.siteMetadata.title
  const {currentPage, numberOfPages} = pageContext
  const slug = currentPage === 1 ? '/' : `/page/${currentPage}`
  
  return (
    <Layout>
      <Seo 
        title={title}
        description={`${title} ${currentPage} page.`}
        slug={slug} />
      
      <IndexPageGrid 
        posts={posts}
        currentPage={currentPage}
        numberOfPages={numberOfPages} />
      
    </Layout>
  );
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx (
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
      filter: {frontmatter: {published: {eq: true}}}
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

export default PostList;