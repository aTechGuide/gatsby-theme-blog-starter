import React from 'react';
import Layout from '../components/layout/layout';
import { graphql } from 'gatsby';
import SEO from '../components/seo';

import SinglePostLayout from '../components/layout/SinglePostLayout';

/**
 * Template used by Blog Posts files under posts folder
 */

const singlepost = ({data, pageContext}) => {

  const{title, description, tags, slug, image} = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <SEO 
        title={title}
        description={description}
        tags={tags.join(",")}
        image={image.childImageSharp.fluid}
        isBlogPost={true}
        slug={slug} />
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
        title
        description
        pagetitle
        summary
        date(formatString: "MMM Do YYYY")
        update_date(formatString: "MMM Do YYYY")
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