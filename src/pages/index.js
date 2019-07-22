import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import PostSnippet from "../components/post/PostSnippet";
import PaginationLinks from '../components/PaginationLinks';
import { Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';
import '../styles/global.css';

const useStyles = makeStyles(theme => ({
  postGridItem: {
    padding: theme.spacing(2)
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
            <Grid container justify='center' alignItems='center' direction='column'>
              <Grid item>
                <Grid container justify='center' >
                  {data.allMarkdownRemark.edges.map(({node}) => (

                    // TODO Make style with pallete
                    <Grid key={node.id} item className={classes.postGridItem} > 
                      <PostSnippet 
                        
                        key={node.id}
                        title={node.frontmatter.title} 
                        author={node.frontmatter.author}
                        slug={node.frontmatter.slug}
                        date={node.frontmatter.date}
                        body={node.excerpt}
                        // fluid={node.frontmatter.image.childImageSharp.fluid}
                        fixed={node.frontmatter.image.childImageSharp.fixed}
                        tags={node.frontmatter.tags} />
                      </Grid>
                  ))}
                  
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify='center' >
                  <Grid item>
                  <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>  
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
            title
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
