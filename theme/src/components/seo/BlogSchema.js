const blogSchema = (frontmatter, image, site, file) => { 

  const url = `${site.siteMetadata.siteUrl}/${frontmatter.slug}`

  return {
    "@context": "http://schema.org", 
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "image": `${site.siteMetadata.siteUrl}${image}`,
    "editor": site.siteMetadata.author, 
    "genre": site.siteMetadata.genre, 
    "keywords": frontmatter.tags.concat(site.siteMetadata.keywords), 
    "url": url,
    "datePublished": frontmatter.date,
    "dateCreated": frontmatter.date,
    "dateModified": frontmatter.update_date !== frontmatter.date ? frontmatter.update_date : frontmatter.date,
    "description": frontmatter.description,
    "author": {
       "@type": "Person",
       "name": site.siteMetadata.author
     },
     "publisher": {
       "@type": "Organization",
       "name": site.siteMetadata.title,
       "logo": {
         "@type": "ImageObject",
         "url": `${site.siteMetadata.siteUrl}${file.childImageSharp.fixed.src}`
       }
     },
     "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": url
     }
  }
}

export default blogSchema