import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Post from '../components/Post';

import { Grid} from '@material-ui/core';

const tagPosts = ({data, pageContext}) => {

  const {tag} = pageContext;
  const { totalCount } = data.allMarkdownRemark

  const pageHeader = `${totalCount} post${totalCount === 1 ?  '' : 's'} tagged with "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
      <Grid container spacing={1} justify='center' >
        {data.allMarkdownRemark.edges.map(({node}) => (
          <Grid key={node.id} item>
            <Post key={node.id} 
              slug={node.frontmatter.title}
              author={node.frontmatter.author}
              date={node.frontmatter.date}
              body={node.excerpt}
              tags={node.frontmatter.tags}
              fluid={node.frontmatter.image.childImageSharp.fluid}
              />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export const tagQuery = graphql`
    query($tag: String!){
      allMarkdownRemark (
        sort: {fields: [frontmatter___date], order: DESC}
        filter: { frontmatter: {tags: { in: [$tag]} } }
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
                    fluid(maxWidth: 650, maxHeight: 370) {
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

export default tagPosts;