import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import Post from "../components/Post";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>This is my Arabic Blog</h1>
    <StaticQuery query={indexQuery} render={data => {
      return (
        <div>
          {data.allMarkdownRemark.edges.map(({node}) => (
            <Post title={node.frontmatter.title} 
              author={node.frontmatter.author}
              path={node.frontmatter.path}
              date={node.frontmatter.date}
              body={node.excerpt} />
          ))}
        </div>
      )
    }}>

    </StaticQuery>
  </Layout>
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            author
            path
            title
            date(formatString: "MMM Do YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
