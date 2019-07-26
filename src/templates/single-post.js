import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';
import SEO from '../components/seo';

import SinglePostLayout from '../components/layout/SinglePostLayout';

/**
 * Template used by Blog Posts files under posts folder
 */

const singlepost = ({data, pageContext}) => {

  const{pagetitle} = data.markdownRemark.frontmatter;

  return (
    <Layout pageTitle={pagetitle} >
      <SEO title={pagetitle} />
      <SinglePostLayout data={data} />
    </Layout>
  );
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: {eq: $slug}}) {
      id
      html
      frontmatter{
        pagetitle
        author
        date(formatString: "MMM Do YYYY")
        tags
        slug
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default singlepost;