import React from "react"
import { graphql, useStaticQuery} from "gatsby";

import Layout from "../components/layout/layout"
import Seo from "../components/seo/Seo"
import IndexPageGrid from "../components/IndexPageGrid";

import 'typeface-roboto';
import 'typeface-markazi-text';

const IndexPage = () => {

  const postsPerPage = 2;
  const data = useStaticQuery(indexQuery)
  const numberOfPages = Math.ceil(data.allMdx.totalCount / postsPerPage);
  const posts = data.allMdx.edges

  return(
    <Layout >
      <Seo title={data.site.siteMetadata.title} />
      <IndexPageGrid 
          posts={posts} 
          currentPage={1}
          numberOfPages={numberOfPages} />
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: 2
      filter: {frontmatter: {published: {eq: true}}}
      ) {
      totalCount
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

export default IndexPage
