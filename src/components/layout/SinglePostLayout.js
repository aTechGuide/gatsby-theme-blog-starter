import React from 'react';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from '../Sidebar';
import Share from '../Share';
import FullPost from '../post/FullPost';
import Comments from '../Comments';


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
  sidebar: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0',
    }
  }
})});


const SinglePostLayout = ({data}) => {

  const classes = useStyles();
  const post = data.markdownRemark.frontmatter;
  const{pagetitle, slug} = post
  
  return (
    <Grid container >
          
    <Grid item xs={12} md={9} className={classes.postGridItem}>
      {/* Left Container Start */}
      <Grid container >
        <Grid item xs={12} >
          <FullPost data={data}/>
        </Grid>
        <Grid item xs={12} className={classes.shareItem}>
          <Share
            slug={slug}
            pagetitle={pagetitle}
            tags={post.tags}
          />
        </Grid>
        <Grid item xs={12} className={classes.comment}>
          <Comments slug={slug} pagetitle={pagetitle} id={data.markdownRemark.id}/>
        </Grid>
      </Grid> 
      {/* Left Container End */}      
    </Grid>

    <Grid item xs={12} md={3} className={[classes.postGridItem, classes.sidebar].join(" ")} >
      {/* Right Container Start*/}
      <Grid container >
        <Grid item xs={12} >
          <Sidebar />
        </Grid>
      </Grid>
      {/* Right Container End*/}
    </Grid>
  
  </Grid>
  );
}

export default SinglePostLayout;