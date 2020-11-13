import React from 'react';

import Layout from '../components/layout/layout';
import Seo from '../components/seo/Seo';
import SinglePostLayout from '../components/layout/SinglePostLayout';
import { useStaticQuery, graphql } from "gatsby";
import blogSchema from "../components/seo/BlogSchema"

/**
 * Template used by Blog Posts files under posts folder
 */

const Singlepost = ({ children, pageContext : {frontmatter, image}}) => {

  const {title, description, keywords, slug} = frontmatter;

  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            author
            genre
          }
        }
        file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fixed(width:60) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  const schema = blogSchema(frontmatter, image, site, file)

  return (
    <Layout>
      <Seo 
        title={title}
        description={description}
        keywords={keywords}
        slug={slug}
        image={image}
        isBlogPost={true}
        blogSchema={schema} />
      
      <SinglePostLayout frontmatter={frontmatter}>
        {children}
      </SinglePostLayout> 
    </Layout>
  );
}

export default Singlepost;