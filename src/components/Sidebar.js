import React from 'react';
import { Card, CardTitle, CardBody, Form, FormGroup, Input} from 'reactstrap';
import { graphql, StaticQuery, Link } from 'gatsby';

import Img from 'gatsby-image';


const Sidebar = () => {
  return (
    <div>
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
                   <Link to={node.frontmatter.path}>
                     <Img className="card-img-top" fluid={node.frontmatter.image.childImageSharp.fluid} />   
                   </Link>
                   <CardBody>
                     <CardTitle>
                       <Link to={node.frontmatter.path}>
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
        frontmatter {
          path
          title
          date
          author
          tags
          image {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt
      }
    }
  }
}
`

export default Sidebar;