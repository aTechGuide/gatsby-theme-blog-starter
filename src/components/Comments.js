import React from 'react';
import Disqus from 'disqus-react';
import {useStaticQuery, graphql} from 'gatsby';

const Comments = ({slug, pagetitle, id}) => {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  const siteDomain = site.siteMetadata.siteUrl;
  const disqusShortname = process.env.GATSBY_DISQUS_NAME;

  const disqusConfig = {
      url: siteDomain + slug,
      identifier: id,
      title: pagetitle,
  };

  return (
    <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
  );
}

export default Comments;