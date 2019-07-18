import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import {Avatar, Typography, CardHeader, Card, CardActionArea,CardActions,CardContent, Chip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'gatsby-image';
import authors from '../util/authors';
import {slugify} from '../util/UtilityFunctions';

const useStyles = makeStyles(theme => ({
  chiprow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
  card: {
    maxWidth: '80%',
    margin: 'auto'
  }
}));

const singlepost = ({data, pageContext}) => {
  const classes = useStyles();

  const post = data.markdownRemark.frontmatter;
  const author = authors.find(x => x.name === post.author)

  const baseURL = 'https://kamranali.in/'


  return (
    <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
      <SEO title={post.title} />   
        <Card className={classes.card}>
          <CardActionArea>
            <Img className="card-image-top" fluid={post.image.childImageSharp.fluid}/>
            <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                AB
              </Avatar>
            }
            title={post.title}
            subheader={post.date}
            />
            <CardContent>    
              <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.chiprow}>
            <div >
              {post.tags.map(tag => (
                <Link key={tag} to={`/tag/${slugify(tag)}`}>
                  <Chip size='small' color='primary' label={tag} className={classes.chip} />
                </Link>
                ))}
            </div>
          </CardActions>
        </Card>
        <h3 className="text-center">
          Share this Post
        </h3>
        <div className="text-center social-share-links">
          <ul>
            <li><a href={'http://www.facebook.com/sharer/sharer.php?u=' + baseURL + pageContext.slug} className="facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook fa-2x"></i></a></li>
            <li><a href={'http://twitter.com/share/?url=' + baseURL + pageContext.slug + '&text=' + post.title + '&via=aTechGuide'} className="twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-2x"></i></a></li>
          </ul>
        </div>
    </Layout>
  );
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
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