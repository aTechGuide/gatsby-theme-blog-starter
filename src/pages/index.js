import React from "react"
import { graphql, StaticQuery} from "gatsby";

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import IndexPageGrid from "../components/IndexPageGrid";

import 'typeface-roboto';
import 'typeface-markazi-text';

const IndexPage = () => {

  const postsPerPage = 2;
  let numberOfPages;

  return(
    <Layout >
      <SEO title="Arabic Blog" />
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
            date(formatString: "MMM Do YYYY")
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

export default IndexPage
