import React, { useState } from 'react';
import {Grid, Button} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useStaticQuery, graphql} from 'gatsby';

import Subscribe from '../Subscribe';
import Share from '../Share';
import FullPost from '../post/FullPost';
import DisqusComments from '../comments/DisqusComments';

const useStyles = makeStyles(theme => {
  return({
  postGridItem: {
    padding: theme.postGridItemPadding
  },
  shareItem: {
    marginTop: theme.postGridItemPadding
  },
  comment: {
    marginTop: theme.postGridItemPadding
    
  },
  commentButton: {
    display: 'flex',
    justifyContent: 'center'
  },
  sidebar: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0',
    }
  }
})});

const SinglePostLayout = ({frontmatter, children}) => {

  const classes = useStyles();
  const [visibleComments, setVisibleComments] = useState(false);
  const theme = useTheme();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            comments
            options {
              showSubscriptionWidget
            }
          }
        }
      }
    `
  )

  const{pagetitle, slug, tags} = frontmatter

  return (
    <Grid container >
          
    <Grid item xs={12} md={9} className={classes.postGridItem}>
      {/* Left Container Start */}
      <Grid container >
        <Grid item xs={12} >
          <FullPost frontmatter={frontmatter}>
            {children}
          </FullPost>
        </Grid>
        <Grid item xs={12} className={classes.shareItem}>
          <Share
            slug={slug}
            pagetitle={pagetitle}
            tags={tags}
          />
        </Grid>
        {site.siteMetadata.comments === 'true' ? <Grid item xs={12} className={classes.comment}>
          { visibleComments ? 
            <DisqusComments slug={slug} pagetitle={pagetitle} id={slug}/> 
            : <div className={classes.commentButton}> <Button {...theme.button} onClick={() => setVisibleComments(true)}> Click to Load Comments</Button> </div>
          } 
        </Grid>: null}
      </Grid> 
      {/* Left Container End */}      
    </Grid>

    <Grid item xs={12} md={3} className={[classes.postGridItem, classes.sidebar].join(" ")} >
      {/* Right Container Start*/}
      <Grid container >
        {
          site.siteMetadata.options.showSubscriptionWidget === true ? <Grid item xs={12} > <Subscribe /> </Grid> : null
        }
      </Grid>
      {/* Right Container End*/}
    </Grid>
  
  </Grid>
  );
}

export default SinglePostLayout;