import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout/layout';
import TagPostsLayout from '../components/layout/TagPostsLayout';
import PageLayout from '../components/layout/PageLayout';
import Seo from '../components/seo/Seo';

const TagPosts = ({data, pageContext}) => {

  const {tag} = pageContext;
  const { totalCount } = data.allMdx
  const title = data.site.siteMetadata.title
  const basePath = data.site.siteMetadata.options.basePath
  const pageHeader = `${totalCount} post${totalCount === 1 ?  '' : 's'} tagged with "${tag}"`

  return (
    <Layout >
      <Seo 
        title={`${tag} Posts`}
        description={`${title} Posts Related to ${tag} Tag.`}
        tags={[tag]}
        slug={basePath === "/" ? `tag/${tag}` : `/${basePath}/tag/${tag}`} />

      <PageLayout title={pageHeader}>
        <TagPostsLayout data={data} pageContext={pageContext}/>
      </PageLayout> 
    </Layout>
  );
}

export const tagQuery = graphql`
    query($tag: String!){
      site {
        siteMetadata {
          title
          options {
            basePath
          }
        }
      }
      allMdx (
        sort: {fields: [frontmatter___date], order: DESC}
        filter: { frontmatter: {published: {eq: true}, tags: { in: [$tag]} } }
      ) {
          totalCount
          edges {
            node {
              id 
              frontmatter {
                ...PostFrontMatter
              }
            }
          }
      }
    }
`

export default TagPosts;