import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import {Badge, Card, CardBody, CardSubtitle} from 'reactstrap';
import Img from 'gatsby-image';
import authors from '../util/authors';
import {slugify} from '../util/UtilityFunctions';

const singlepost = ({data, pageContext}) => {

  const post = data.markdownRemark.frontmatter;
  const author = authors.find(x => x.name === post.author)

  const baseURL = 'https://kamranali.in/'


  return (
    <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
      <SEO title={post.title} />   
        <Card>
          <Img className="card-img-top" fluid={post.image.childImageSharp.fluid}/>
          <CardBody>
            <CardSubtitle>
              <span className="text-info">{post.date}</span> by {' '}
              <span className="text-info">{post.author}</span>
            </CardSubtitle>
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            <ul className="post-tags">
              { post.tags.map(tag => (
                <li key={tag} >
                  <Link to={`/tag/${slugify(tag)}`}>
                    <Badge color="primary"> {tag} </Badge>
                  </Link>
                </li>
              )) }
            </ul>
          </CardBody>
        </Card>
        <h3 className="text-center">
          Share this Post
        </h3>
        <div className="text-center social-share-links">
          <ul>
            <li><a href={'http://www.facebook.com/sharer/sharer.php?u=' + baseURL + pageContext.slug} className="facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook fa-2x"></i></a></li>
            <li><a href={'http://twitter.com/share/?url=' + baseURL + pageContext.slug + '&text=' + post.title + '&via' + 'aTechGuide'} className="twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-2x"></i></a></li>
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