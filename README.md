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
- `postsPerPage` => Maximum number of posts displayed on each pagination page
- `mailchimpURL` => Form `action` URL for MailChimp subscription form. If not provided, subscription box will not be displayed

### Default Options
```
{
  resolve: `gatsby-theme-blog-starter`,
  options: {
    trackingId: "UA-11111XXX-1",
    postsPath: "posts",
    postsPerPage: "2",
    mailchimpURL: ""
  },
},
```

## Theme
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
  linkTransition: {
    fade: "true",
    duration: .5
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