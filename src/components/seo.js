import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ title, description, tags, lang, image: metaImage, isBlogPost, slug, meta }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            twitterId
            siteUrl
            keywords
          }
        }
      }
    `
  )

  const pageTitle = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  
  const keywords = tags || site.siteMetadata.keywords.join(",")
  const twitterId = site.siteMetadata.twitterId

  const domain = site.siteMetadata.siteUrl
  const url = slug ? `${domain}/${slug}` : domain

  const image = metaImage && metaImage.src
            ? `${domain}${metaImage.src}`
            : null;
  
  const type = isBlogPost ? `article` : `website`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: keywords
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          name: `twitter:site`,
          content: domain,
        },
        {
          name: `twitter:creator`,
          content: twitterId,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        metaImage
          ? [
              {
                property: "og:image",
                content: image
              },
              // {
              //   property: "og:image:width",
              //   content: metaImage.width
              // },
              // {
              //   property: "og:image:height",
              //   content: metaImage.height
              // },
              {
                name: "twitter:card",
                content: "summary_large_image"
              },
              {
                property: "twitter:image",
                content: image
              }
            ]
          : [
              {
                name: "twitter:card",
                content: "summary"
              }
            ]
      )
      .concat(meta)}
    >
      <script type="text/javascript" src="/script.js">

      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  isBlogPost: false,
  meta: []
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
