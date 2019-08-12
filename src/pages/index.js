import React from "react"
import { graphql, StaticQuery} from "gatsby";

import Layout from "../components/layout/layout"
import Seo from "../components/seo/Seo"
import IndexPageGrid from "../components/IndexPageGrid";

import 'typeface-roboto';
import 'typeface-markazi-text';

const IndexPage = () => {

  const postsPerPage = 2;
  let numberOfPages;

  return(
    <Layout >
      <Seo title="Arabic Blog"/>
      
      <StaticQuery 
        query={indexQuery} 
        render={data => {
          numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage);
          const posts = data.allMarkdownRemark.edges
          return (
            <IndexPageGrid 
              posts={posts} 
              currentPage={1}
              numberOfPages={numberOfPages} />
          )
        }}/>
    </Layout>
  )
}

const indexQuery = graphql`
  {
    site {
      siteMetadata {
        gridSpacing
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: 2
      filter: {frontmatter: {published: {eq: true}}}
      ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            pagetitle
            summary
            date(formatString: "MMM D, YYYY")
            tags
            slug
            image {
              childImageSharp {
                fixed(width: 350, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
