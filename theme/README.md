# gatsby-theme-blog-starter

<p align="center">
  <a href="https://github.com/aTechGuide/gatsby-theme-blog-starter/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="gatsby-theme-blog-starter is released under the MIT license." />
  </a>
  <a href="https://www.npmjs.com/package/gatsby-theme-blog-starter">
    <img src="https://img.shields.io/npm/v/gatsby-theme-blog-starter.svg" alt="Current npm package version." />
  </a>
  <a href="https://npmcharts.com/compare/gatsby-theme-blog-starter?minimal=true">
    <img src="https://img.shields.io/npm/dm/gatsby-theme-blog-starter.svg?color=blue" alt="Downloads per month on npm." />
  </a>
  <a href="https://npmcharts.com/compare/gatsby-theme-blog-starter?minimal=true">
    <img src="https://img.shields.io/npm/dt/gatsby-theme-blog-starter.svg?color=blue" alt="Total downloads on npm." />
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  <a href="https://twitter.com/intent/follow?screen_name=atechguide">
      <img src="https://img.shields.io/twitter/follow/atechguide.svg?label=Follow%20@atechguide" alt="Follow @atechguide" />
    </a>
</p>

Gatsby theme for creating super fast, SEO optimized blog powered by [MDX](https://mdxjs.com/getting-started/gatsby) and [Material UI](https://material-ui.com/). See the [Live demo](https://gatsby-theme-blog-starter.netlify.com/)

[Personal Tech Blog](https://atech.guide/)

## Performance
### Desktop (Home)

<p align="center">
  <a href="http://atech.guide">
    <img alt="Gatsby Theme" src="https://gatsby-theme-blog-starter.netlify.com/desktop-home-100.png" />
  </a>
</p>

### Desktop (Blog Page)
<p align="center">
  <a href="http://atech.guide">
    <img alt="Gatsby Theme" src="https://gatsby-theme-blog-starter.netlify.com/desktop-page-100.png" />
  </a>
</p>

### Mobile (Home)

<p align="center">
  <a href="http://atech.guide">
    <img alt="Gatsby Theme" src="https://gatsby-theme-blog-starter.netlify.com/mobile-home-100.png" />
  </a>
</p>

### Mobile (Blog Page)

<p align="center">
  <a href="http://atech.guide">
    <img alt="Gatsby Theme" src="https://gatsby-theme-blog-starter.netlify.com/mobile-page-100.png" />
  </a>
</p>

## ✨Features
It provides following functionality out of box
- Fully optimized for Lighthouse audit
- Responsive
- Pagination for blog posts
- Tags for browsing the content
- Subscription box (Powered by Mailchimp)
- Google Structured Data
- Disqus React for commenting
- Feed
- Google Analytics 
- Sitemap

## 🚀Getting Started

### Install
Manually add to you site

`npm install --save gatsby-theme-blog-starter`

### Theme options

| Key              | Default value    | Description                                                                                               |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| `basePath`       | "/"              | Root url for the blog                                                                               |
| `trackingId`     | "UA-11111XXX-1"  | Google Analytics Tracking ID                                                                               |
| `postsPath`      | "posts"          | Name of the directory from where the posts should be picked                              |
| `imagesPath`     | "images"         | Name of the directory from where the images should be picked                                                |
| `postsPerPage`   | "2"              | Maximum number of posts displayed on each pagination page |
| `mailchimpURL`   | ""               | Form `action` URL for MailChimp subscription form. If not provided, subscription box will not be displayed |

### Example usage

```js
// gatsby-config.js
module.exports = {
  plugins: [
        {
      resolve: "gatsby-theme-blog-starter",
      options: {
        basePath: "/",
        trackingId: "UA-11111XXX-1",
        postsPath: "posts",
        imagesPath: "images",
        postsPerPage: "2",
        mailchimpURL: ""
      },
    },
  ],
}
```
### Additional configuration
In addition to the theme options, there are a handful of items you can customize via the siteMetadata object in your site's gatsby-config.js
```
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Blog Title`,
    description: `Blog Description`,
    author: `Author Name`,
    twitterId: `@twitterHandle`,
    siteUrl: `site domain name`,
    genre: 'Genre', // Used for Google Structured Data
    keywords: [`Technology Blog`], // Used for SEO and Google Structured Data
    email: `admin@blog.com`, // Contact email Used for Google Structured Data
    social: [
      'https://www.facebook.com/aTechGuide/'  // Social link used in site schema for Google Structured Data
    ],
    contactSupport: 'https://www.site.com/support/', // Contact link used in site schema for Google Structured Data
    bingId: '', // Support for Bing 
    menuLinks: [{name: 'Projects', link: '/page/1'}], // Adding Menu bar links
    footerLinks: [{name: 'Projects', link: '/page/1'}], // Adding footer links
    displayFooterMessage: true, // Enable footer message
    comments: 'true' // Enable disable comments
  },
}
```

## Folder, Icon and Environment Variables
- Create `posts` directory (name of this directory is as per options) and add posts into it
- Create `images` directory (name of this directory is as per options) and images into it to be used by queries directly
  - Add icon under `images` by the name `icon.png` (name has to be icon)
- Add .env.* providing `disqus shortname` as value for key `GATSBY_DISQUS_NAME` 

## 📝Theme
To override the theme of entire site. You may shadow the `theme.js` file under `example-site/src/gatsby-theme-blog-starter/theme.js`

### Default Theme 
```
import {deepPurple, red, indigo, yellow, cyan, lightGreen} from '@material-ui/core/colors/';

const theme = {
  palette: {
    primary: deepPurple,
    secondary: red
  },
  typography: {
    fontSize: 16,
    h1 : {
      fontSize: "3rem",
      fontWeight: 500,
      color: deepPurple[700]
    }
  },
  button: {
    color: "primary",
    variant: "contained"
  },
  postGridItemPadding: '16px',
  headingColor: indigo,
  highlightOne: yellow,
  highlightTwo: cyan,
  highlightThree: lightGreen
}

export default theme
```

## Header

Header is customizable with configurations in gatsby-config.js which looks like,  

```
menuLinks: [{name: 'Tags', link: '/tags/'}], // Array of top Navigation bar items. Make sure you have pages corresponding to the value of `link`
```

You may also completely shadow the `header.js` inside `src/components`

## Footer

Footer is customizable with configurations in gatsby-config.js which looks like,  

```
footerLinks: [{name: 'About', link: '/about/'}, {name: 'Terms of Use', link: '/terms-of-use/'}, {name: 'Privacy Policy', link: '/privacy-policy/'}], //<- Make sure you have pages corresponding to the value of `link`
displayFooterMessage: true, // <- This controls the display of "Powered by Gatsby, Material UI and Netlify"
```

You may also completely shadow the `Footer.js` inside `src/components`

## FrontMatter
Frontmatter for pages powered by Mdx looks like

```
---
title: SEO friendly Title which will be used in <title> HTML Tag
description: SEO friendly Description which will be used in <meta name="description"> HTML Tag
pagetitle: Title of the Post
summary: Description of the post used in snippet in index page
date: Published Date
update_date: Updated Date
tags:
  - technology
label:
  - tech
slug: seo-friendly-url
published: true
image: ./path-to-image-used-in-featured-snippet-and-structured-snippet.png
---

```