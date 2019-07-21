import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import PostSnippet from "../components/post/PostSnippet";
import PaginationLinks from '../components/PaginationLinks';
import { Grid} from '@material-ui/core';
import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  shadowBox: {
    
  }
}));

const IndexPage = () => {
  const classes = useStyles();

  const postsPerPage = 2;
  let numberOfPages;

  return(
    <Layout pageTitle="Arabic Blog">
      <SEO title="Home" />
      <StaticQuery 
        query={indexQuery} 
        render={data => {
          numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage);
          return (
            <React.Fragment>
              <Grid container spacing={parseInt(data.site.siteMetadata.gridSpacing)} justify='center' >
                {data.allMarkdownRemark.edges.map(({node}) => (

                  <Grid key={node.id} item className={classes.shadowBox}>
                    <PostSnippet 
                      key={node.id}
                      title={node.frontmatter.title} 
                      author={node.frontmatter.author}
                      slug={node.fields.slug}
                      date={node.frontmatter.date}
                      body={node.excerpt}
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                      tags={node.frontmatter.tags} />
                    </Grid>
                ))}
                
              </Grid>
              <Grid container spacing={parseInt(data.site.siteMetadata.gridSpacing)} justify='center' >
                <Grid item>
                <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
                </Grid>
              </Grid>
            </React.Fragment>  
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
      ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 350, maxHeight: 120) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields{
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
