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
  const description = data.site.siteMetadata.description
  const keywords = data.site.siteMetadata.keywords
  const {currentPage, numberOfPages} = pageContext
  const slug = currentPage === 1 ? '' : `page/${currentPage}`
  const fullTitle = currentPage === 1 ? title : ` ${title} [page ${currentPage}]`
  const fullDescription = currentPage === 1 ? description : ` ${description} [page ${currentPage}]`
  
  return (
    <Layout>
      <Seo 
        title={fullTitle}
        description={fullDescription}
        keywords={keywords}
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
        description
        keywords
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