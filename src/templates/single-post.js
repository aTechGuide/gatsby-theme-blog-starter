import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import {Grid} from '@material-ui/core';
import authors from '../util/authors';

import Sidebar from '../components/Sidebar';
import Sharing from '../components/Sharing';
import FullPost from '../components/post/FullPost';

/**
 * Template used by Blog Posts files under posts folder
 */

const singlepost = ({data, pageContext}) => {
  
  const post = data.markdownRemark.frontmatter;
  const author = authors.find(x => x.name === post.author)
  const space = parseInt(data.site.siteMetadata.gridSpacing)

  return (
    <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
      <SEO title={post.title} />

        {/* Main Container */}
        <Grid container spacing={space}>
          
          <Grid item xs={12} md={9}>
            {/* Left Container Start */}
            <Grid container spacing={space} >
              <Grid item xs={12} >
                <FullPost post={post} data={data}/>
              </Grid>
              <Grid item xs={12}>
                <Sharing pageContext={pageContext} post={post}/>
              </Grid>
            </Grid> 
            {/* Left Container End */}      
          </Grid>

          <Grid item xs={12} md={3}>
            {/* Right Container Start*/}
            <Grid container spacing={space} >
              <Grid item xs={12}>
                <Sidebar />
              </Grid>
            </Grid>
            {/* Right Container End*/}
          </Grid>
        
        </Grid>
             
    </Layout>
  );
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
    site {
      siteMetadata {
        gridSpacing
      }
    }
    markdownRemark(fields: { slug: {eq: $slug}}) {
      id
      html
      frontmatter{
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default singlepost;