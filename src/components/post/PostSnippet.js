import React, {useContext} from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, CardHeader, Card, CardActionArea,CardActions,CardContent, Chip} from '@material-ui/core';

import {slugify} from '../../util/UtilityFunctions';
import Context from '../Context';

const useStyles = makeStyles(theme => ({
  cardActionBottom: {
    justifyContent: 'space-between',
    paddingTop: '0px'
  },
  chip: {
    margin: theme.spacing(1),
  },
  chipRow: {
    display: 'flex',
  },
  card: {
    width: 350,
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    '&:hover': {
      transform: 'scale(1.03, 1.03)'
    }
  },
  cardContent: {
    paddingTop: '0px',
    paddingBottom: '0px',
    height: '100px',
  }
}));

const PostSnippet = ({pagetitle, body, date, tags, slug, fixed}) => {

  const classes = useStyles();
  const contextData = useContext(Context)

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
 
  return (
    <Card className={classes.card} raised>
      <CardActionArea href={"/" + slug}>
        <Img fixed={fixed} draggable={false} title={pagetitle} alt={pagetitle} />
      </CardActionArea>
        <CardHeader
        avatar={<Img fixed={contextData.icon.file.childImageSharp.fixed} alt={site.siteMetadata.title} />}
        title={pagetitle}
        subheader={date}
      />
        <CardContent className={classes.cardContent}>    
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      
      <CardActions className={classes.cardActionBottom}>
        <div className={classes.chipRow}>
          {tags.map(tag => (
            <Chip key={tag} size='small' color='primary' label={tag} className={classes.chip} 
              clickable onClick={() => navigate(`/tag/${slugify(tag)}/`) } />
            ))}
        </div>
        <Button href={"/" + slug} size="small" color="primary" variant='outlined'>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export const postFrontMatter = graphql`
  fragment PostFrontMatter on MdxFrontmatter {
    pagetitle
    summary
    date(formatString: "MMM D, YYYY")
    tags
    slug
    image {
      childImageSharp {
        fixed(width: 350, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
}
`

export default PostSnippet;