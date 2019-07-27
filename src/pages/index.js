import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery , useStaticQuery} from "gatsby";
import '../styles/global.css';
import IndexPageGrid from "../components/IndexPageGrid";

import 'typeface-roboto';
import 'typeface-markazi-text';

const IndexPage = () => {

  /**
   * Loding ICON which can be used everywhere
   */
  const icon = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fixed(width:60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const postsPerPage = 2;
  let numberOfPages;

  return(
      <Layout pageTitle="Arabic Blog" icon={icon}>
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
                numberOfPages={numberOfPages}
                icon={icon} />
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
