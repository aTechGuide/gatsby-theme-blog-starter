import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Seo from '../components/seo/Seo';

import SinglePostLayout from '../components/layout/SinglePostLayout';

/**
 * Template used by Blog Posts files under posts folder
 */

const singlepost = ({data, pageContext}) => {

  const{title, description, tags, image, slug, date, update_date} = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <Seo 
        title={title}
        description={description}
        tags={tags}
        image={image.childImageSharp.fluid}
        isBlogPost={true}
        slug={slug}
        date={date}
        update_date={update_date} />
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
        date(formatString: "MMM D, YYYY")
        update_date(formatString: "MMM D, YYYY")
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