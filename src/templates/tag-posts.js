import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout/layout';

import TagPostsLayout from '../components/layout/TagPostsLayout';

const tagPosts = ({data, pageContext}) => {

  const {tag} = pageContext;
  const { totalCount } = data.allMarkdownRemark
  const pageHeader = `${totalCount} post${totalCount === 1 ?  '' : 's'} tagged with "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
      <TagPostsLayout data={data} pageContext={pageContext}/>
    </Layout>
  );
}

export const tagQuery = graphql`
    query($tag: String!){
      site {
        siteMetadata {
          gridSpacing
        }
      }
      allMarkdownRemark (
        sort: {fields: [frontmatter___date], order: DESC}
        filter: { frontmatter: {tags: { in: [$tag]} } }
      ) {
          totalCount
          edges {
            node {
              id 
              frontmatter {
                title
                date(formatString: "MMM Do YYYY")
                author
                tags
                slug
                image {
                  childImageSharp {
                    fixed(width: 350) {
                      ...GatsbyImageSharpFixed
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

export default tagPosts;