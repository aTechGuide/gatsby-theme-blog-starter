import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

/**
 * Page should provide following props
 * - title
 * - description
 * - tags (Array of keywords inserted in page. If provided, prepended to default keywords)
 * - slug (because its used in canonocal links)
 * 
 * Blog should provide page props + following
 * - image: Pass either fluid Or fixed
 *   - Blogs pass fluid
 * - isBlogPost
 * - date
 * - update_date
 * 
 * Default values
 * - isBlogPost: false
 * - lang: en
 * - meta: []
 */

 /**
  * Always add Seo to New Page "i.e." an entry page of the App just below <Layout> Component.
  * Do NOT add Seo in other Layouts
  */
function Seo({ title, description, tags, image: metaImage, isBlogPost, slug, date, update_date, lang, meta }) {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            twitterId
            siteUrl
            genre
            keywords
            author
            email
            social
            contactSupport
            bingId
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

  const pageTitle = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description

  const keywords = tags ? tags.concat(site.siteMetadata.keywords) : site.siteMetadata.keywords.join(",")
  const twitterId = site.siteMetadata.twitterId

  const domain = site.siteMetadata.siteUrl
  const url = slug && slug !== '/' ? `${domain}/${slug}/` : domain

  const image = metaImage
            ? `${domain}${metaImage}`
            : null;
  
  const type = isBlogPost ? `article` : `website`

  const siteSchema = {
    "@context": "http://schema.org/",
    "@type": "Organization",
    "name": site.siteMetadata.title,
    "legalName" : site.siteMetadata.title,
    "url": domain,
    "logo": `${domain}${file.childImageSharp.fixed.src}`,
    "founders": [
      {
      "@type": "Person",
      "name": site.siteMetadata.author
      }],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": site.siteMetadata.email,
      "url": site.siteMetadata.contactSupport
      },
    "sameAs": [ 
      site.siteMetadata.social.join(",")
    ]
  }

  const blogSchema = { 
    "@context": "http://schema.org", 
    "@type": "BlogPosting",
    "headline": pageTitle,
    "image": image,
    "editor": site.siteMetadata.author, 
    "genre": site.siteMetadata.genre, 
    "keywords": keywords, 
    "url": url,
    "datePublished": date,
    "dateCreated": date,
    "dateModified": update_date !== date ? update_date : date,
    "description": metaDescription,
    "author": {
       "@type": "Person",
       "name": site.siteMetadata.author
     },
     "publisher": {
       "@type": "Organization",
       "name": site.siteMetadata.title,
       "logo": {
         "@type": "ImageObject",
         "url": `${domain}${file.childImageSharp.fixed.src}`
       }
     },
     "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": url
     }
    }

  const schema = isBlogPost ? blogSchema : siteSchema

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
          name: `author`,
          content: site.siteMetadata.author,
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
          property: `og:locale`,
          content: "en_US",
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
        site.siteMetadata.bingId !== ''
          ? [{
            name: `msvalidate.01`,
            content: site.siteMetadata.bingId,
          }]
          : []
      ).concat(
        metaImage
          ? [
              {
                property: "og:image",
                content: image
              },
              { 
                property: "og:image:alt", 
                content: title 
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
              },
              { 
                property: "twitter:image:alt", 
                content: title 
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
      <script type="text/javascript">
        {`
          function addToHomeScreen(){document.querySelector("#a2hs").style.display="none";deferredPrompt.prompt();deferredPrompt.userChoice.then(function(a){deferredPrompt=null})}var deferredPrompt;window.addEventListener("beforeinstallprompt",function(a){a.preventDefault();deferredPrompt=a;a=document.querySelector("#a2hs");a.style.display="block";a.addEventListener("click",addToHomeScreen)});
        `}
      </script>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      <link rel="canonical" href={url} />
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  isBlogPost: false,
  meta: []
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
