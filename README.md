# Gatsby theme blog starter

This is a Gatsby blog theme powered by [MDX](https://mdxjs.com/getting-started/gatsby) and [Material UI](https://material-ui.com/). It provides following functionality out of box
- Pagination for blog posts
- Tags for browsing the content
- Subscription box (Powered by Mailchimp)
- Google Structured Data
- Disqus React for commenting
- Feed
- Google Analytics 
- Sitemap


## How to use
- Include `gatsby-theme-blog-starter` as dependency in your blog
- Point to directory where posts will reside
```
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `posts`,
    path: `${__dirname}/src/posts/`,
  },
},
```
- Point to directory where images will reside
```
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `images`,
    path: `${__dirname}/src/images`,
  },
},
```
- Add icon under `src/images` by the name `icon.png`
- Add .env.* providing `disqus shortname` as value for key `GATSBY_DISQUS_NAME` 
- Create `static` folder at root of project and add `robots.txt`