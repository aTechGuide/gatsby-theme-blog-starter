import React from 'react';
import {Grid, Typography, Card, CardContent} from '@material-ui/core';

import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon
} from 'react-share';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  postGridItem: {
    padding: theme.postGridItemPadding
  }
}));

const Share = ({ socialConfig, tags }) => {

  const classes = useStyles();
  const postLink= socialConfig.siteDomain + socialConfig.config.url;

  return(

    <Card>
      <CardContent>    
        <Grid container alignItems='center' >
          <Grid item className={classes.postGridItem} xs={12} md={4}>
            <Typography variant='h5'>
              Share this Post
            </Typography>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <FacebookShareButton url={postLink}  >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <TwitterShareButton url={postLink} title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags} >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <LinkedinShareButton url={postLink} title={socialConfig.config.title} >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <RedditShareButton url={postLink} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >
              <RedditIcon size={32} round={true} />
            </RedditShareButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    
)};

export default Share;