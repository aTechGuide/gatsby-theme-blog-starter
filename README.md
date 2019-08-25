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
- Create `posts` directory and add posts into it
- Create `images` directory and images into it to be used by queries directly
- Add icon under `images` by the name `icon.png`
- Add .env.* providing `disqus shortname` as value for key `GATSBY_DISQUS_NAME` 
- Create `static` folder at root of project and add `robots.txt`

## Options
- `trackingId` => Google Analytics Tracking ID
- `postsPath` => Name of the directory (at root of App) from where the posts should be picked

### Default Options
```
{
  resolve: `gatsby-theme-blog-starter`,
  options: {
    trackingId: "UA-11111XXX-1",
    postsPath: "posts"
  },
},
```