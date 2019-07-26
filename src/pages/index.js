import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import '../styles/global.css';
import IndexPageGrid from "../components/IndexPageGrid";

import 'typeface-roboto';

const IndexPage = () => {

  const postsPerPage = 2;
  let numberOfPages;

  return(
      <Layout pageTitle="Arabic Blog">
        <SEO title="Home" />
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

export default IndexPage
