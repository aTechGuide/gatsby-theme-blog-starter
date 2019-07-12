import React from 'react';
import { Card, CardTitle, CardBody, CardText, Form, FormGroup, Input} from 'reactstrap';
import { graphql, StaticQuery, Link } from 'gatsby';

import Img from 'gatsby-image';


const Sidebar = ({author, authorFluid}) => {
  return (
    <div>
      {author && (
        <Card>
          <Img className="card-img-top" fluid={authorFluid} />
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              {author.name}
            </CardTitle>
            <CardText> {author.bio} </CardText>
            <div className="author-social-links text-center">
              <ul>
                <li><a href={author.facebook} target="_blank" rel="noopener noreferrer" className="facebook"> <i className="fa fa-facebook fa-2x"></i></a></li>
                <li><a href={author.twitter} target="_blank" rel="noopener noreferrer" className="twitter"><i className="fa fa-twitter fa-2x"></i></a> </li>
                <li><a href={author.instagram} target="_blank" rel="noopener noreferrer" className="instagram"><i className="fa fa-instagram fa-2x"></i></a></li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            NewsLetter
          </CardTitle>
          <Form className="text-center">
            <FormGroup>
              <Input type="email" name="email" placeholder="Your email address.." />
            </FormGroup>
            <button className="btn btn-outline-success text-uppercase"> Subscribe </button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase">
            Advertisement
          </CardTitle>
          <img src="https://via.placeholder.com/320x200" alt="Advert" style={{width: "100%"}}/>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Recent Posts
          </CardTitle>
          <StaticQuery query={sidebarQuery} render={ (data) => (
            <div>
              {data.allMarkdownRemark.edges.map( ({node}) => (
                <Card key={node.id} >
                   <Link to={node.fields.slug}>
                     <Img className="card-img-top" fluid={node.frontmatter.image.childImageSharp.fluid} />   
                   </Link>
                   <CardBody>
                     <CardTitle>
                       <Link to={node.fields.slug}>
                         {node.frontmatter.title}
                       </Link>
                     </CardTitle>
                   </CardBody>
                </Card>
              ) )}
            </div>
          ) }/>
        </CardBody>
      </Card>
    </div>
  );
}

const sidebarQuery = graphql`
{
  allMarkdownRemark (sort: {fields:[frontmatter___date], order:DESC}, limit: 3)
   { edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          image {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`

export default Sidebar;