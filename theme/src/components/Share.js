import React from 'react';
import {Grid, Typography, Card, CardContent, useMediaQuery} from '@material-ui/core';
import {useStaticQuery, graphql} from 'gatsby';

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
  },
  icon: {
    '&:hover': {
      cursor : 'pointer'
    }
  },
  button: {
    '&:focus': {
      outline : 'none'
    }
  },
}));

const Share = ({slug, pagetitle, tags }) => {

  const classes = useStyles();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            twitterId
          }
        }
      }
    `
  )
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const iconSize = matches ? 64 : 32

  const postLink= `${site.siteMetadata.siteUrl}/${slug}`

  return(

    <Card>
      <CardContent>    
        <Grid container alignItems='center' >
          <Grid item className={classes.postGridItem} xs={12} md={4}>
            <Typography variant='h3'>
              Share Post
            </Typography>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <FacebookShareButton url={postLink} className={classes.button}>
              <FacebookIcon size={iconSize} round={true} className={classes.icon} />
            </FacebookShareButton>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <TwitterShareButton url={postLink} className={classes.button} title={pagetitle} via={site.siteMetadata.twitterId.split('@').join('')} hashtags={tags} >
              <TwitterIcon size={iconSize} round={true} className={classes.icon} />
            </TwitterShareButton>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <LinkedinShareButton url={postLink} className={classes.button} title={pagetitle} >
              <LinkedinIcon size={iconSize} round={true} className={classes.icon} />
            </LinkedinShareButton>
          </Grid>
          <Grid item className={classes.postGridItem} md={2}>
            <RedditShareButton url={postLink} className={classes.button} title={pagetitle} >
              <RedditIcon size={iconSize} round={true} className={classes.icon} />
            </RedditShareButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    
)};

export default Share;