import React, {useContext} from 'react';
import {CardHeader, Card,CardActions,CardContent} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useStaticQuery, graphql} from 'gatsby';
import Img from "gatsby-image"

import Context from '../Context';
import Tags from './Tags';

/**
 dt, .word{color: blue;}
dd {color: darkblue; padding-left: 40px}
dt, dd {font-weight: bold}

.heading1, .irabhighlight{color: darkred;}
.heading2{color: darkmagenta;}
.exception{color: red; display: inline;}
.bg-yellow{background-color: yellow;}
.bg-cyan{background-color: lightcyan;}
.bg-green{background-color: lightgreen;}
 */
const useStyles = makeStyles(theme => ({
  
  chip: {
    margin: theme.spacing(1),
  },
  card: {
    maxWidth: '80%',
    margin: 'auto'
  },
  header: {
    paddingBottom: '0px'
  },
  '@global': {
    '.firstword': {
      color: theme.palette.primary[500],
      fontSize: theme.spacing(3)
    },
    '.word' : { //<- Deprecate this
      color: theme.palette.primary[500]
    },
    '.irab' : {
      color: theme.palette.primary[500],
      display: 'block'
    },
    '.irabhighlight': {
      color: theme.headingColor[500]
    },
    '.heading1': {
      color: theme.headingColor[900]
    },
    '.heading2' : {
      color: theme.headingColor[400]
    },
    '.exception' : {
      color: theme.palette.error['dark'],
      display: 'inline'
    },
    '.bg-yellow' : {
      backgroundColor: theme.highlightOne[200],
      borderRadius: theme.spacing(.5)
    },
    '.bg-cyan' : {
      backgroundColor: theme.highlightTwo[50],
      borderRadius: theme.spacing(.5)
    },
    '.bg-green' : {
      backgroundColor: theme.highlightThree[100],
      borderRadius: theme.spacing(.5)
    },
    'h2' : {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: theme.palette.secondary[700] ,
      margin: 0,
      marginTop: theme.spacing(2),
    },
    'h3' : {
      fontSize: "1.2rem",
      fontWeight: 500,
      color: theme.palette.secondary[700] ,
      margin: 0,
      marginTop: theme.spacing(2),
    },
    'p' : {
      margin: 0
    },
    'ul' : {
      margin: 0
    },
    'blockquote' : {
      margin: 0,
      padding: '0 1rem',
      borderLeft: '0.25rem solid #ccc',
      width: 'fit-content',
      borderTopRightRadius: theme.spacing(1),
      borderBottomRightRadius: theme.spacing(1),
      background: theme.palette.grey[200]
    },
    '.arabic': {
      fontFamily :'Markazi Text'
    }
  }
}));

const FullPost = ({frontmatter, children}) => {
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
    <Card component="article">
      <CardHeader
        // avatar={<Avatar aria-label="Recipe" className={classes.avatar}>AB</Avatar>}
        avatar={<Img fixed={contextData.icon.file.childImageSharp.fixed} alt={site.siteMetadata.title} />}
        title={frontmatter.pagetitle}
        subheader={frontmatter.update_date !== frontmatter.date ? `Published: ${frontmatter.date} • Updated: ${frontmatter.update_date}` : `Published: ${frontmatter.date}`}
        titleTypographyProps={{variant: 'h1', component: 'h1'}}
        className={classes.header}
      />
      <CardContent>
        {children}
      </CardContent>
      
      <CardActions disableSpacing >
        <Tags tags={frontmatter.tags}/>
      </CardActions>
    </Card>
  );
}

export default FullPost;