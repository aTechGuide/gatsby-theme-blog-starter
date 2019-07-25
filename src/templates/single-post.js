import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import {Grid} from '@material-ui/core';

import Sidebar from '../components/Sidebar';
import Sharing from '../components/Sharing';
import FullPost from '../components/post/FullPost';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Template used by Blog Posts files under posts folder
 */

const useStyles = makeStyles(theme => ({
  postGridItem: {
    padding: theme.spacing(2)
  }
}));

const singlepost = ({data, pageContext}) => {
  const classes = useStyles();
  
  const post = data.markdownRemark.frontmatter;

  return (
    <Layout pageTitle={post.title} >
      <SEO title={post.title} />

        {/* Main Container */}
        <Grid container >
          
          <Grid item xs={12} md={9} className={classes.postGridItem}>
            {/* Left Container Start */}
            <Grid container >
              <Grid item xs={12} >
                <FullPost data={data}/>
              </Grid>
              <Grid item xs={12}>
                <Sharing pageContext={pageContext} post={post}/>
              </Grid>
            </Grid> 
            {/* Left Container End */}      
          </Grid>

          <Grid item xs={12} md={3} className={classes.postGridItem}>
            {/* Right Container Start*/}
            <Grid container >
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
  query blogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: {eq: $slug}}) {
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
  }
`

export default singlepost;