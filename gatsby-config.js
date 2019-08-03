module.exports = {
  siteMetadata: {
    // Final blog https://github.com/hidjou/classsed-gatsby-blog/
    title: `Arabic Blog`,
    description: `Kamran Ali's Arabic Grammar Blog`,
    author: `Kamran Ali`,
    twitterId: `@aTechGuide`,
    url: `https://arabicblog.info`,
    keywords: [`Arabic`, `ArabicBlog`, `Arabic Tutorials`, `Arabic Grammar`, `Arabic Grammar Tutorials`, `Learn Arabic in English`],
    gridSpacing: `2`,
    email: `admin@arabicblog.info`,
    paginate: `12`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-sharp`, // Plugins For Image Processing
    `gatsby-plugin-sharp`, // Image Transformations; Sharp should be before we transform our markdown file
    {
      resolve: 'gatsby-transformer-remark', // Requires to format markdown
      options: {
        plugins: [
          'gatsby-remark-attr', // Add attributes to MarkdownRemark
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases:{sh: "bash", js:"javascript"},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`, //<- Creates manifest file
      options: {
        name: "ArabicBlog.info",
        short_name: "ArabicBlog",
        description: "Arabic Notes",
        start_url: "/",
        background_color: "#673ab7",
        theme_color: "#673ab7",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    `gatsby-plugin-offline`, //<- Adds service worker; Add after gatsby-plugin-manifest
    `gatsby-plugin-netlify-headers`,
  ],
}
