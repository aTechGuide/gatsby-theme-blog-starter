const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google-analytics.com",
  "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' https://www.google-analytics.com"
];

const directivesToCspHeader = headers => headers.join(';');

module.exports = {
  siteMetadata: {
    // Final blog https://github.com/hidjou/classsed-gatsby-blog/
    title: `Arabic Blog`,
    description: `Kamran Ali's Arabic Grammar Blog`,
    author: `Kamran Ali`,
    twitterId: `@aTechGuide`,
    //siteUrl: `https://arabicblog.info`,
    siteUrl: `https://arabicblog.netlify.com`,
    genre: 'Arabic Grammar Tutorials',
    keywords: [`Arabic`, `ArabicBlog`, `Arabic Tutorials`, `Arabic Grammar`, `Arabic Grammar Tutorials`, `Learn Arabic in English`],
    gridSpacing: `2`,
    email: `admin@arabicblog.info`,
    paginate: `12`,
    social: [
      'https://www.facebook.com/arabicblog/'
    ],
    contactSupport: 'https://www.facebook.com/arabicblog/',
    bingId: 'B73F178C4AB143116D3FE641C6044861'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
                siteUrl
                site_url: siteUrl
                email
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return({
                  title: edge.node.frontmatter.pagetitle,
                  description: edge.node.frontmatter.summary,
                  guid: `${site.siteMetadata.siteUrl}/${edge.node.frontmatter.slug}`,
                  custom_elements: [
                    { "link": `${site.siteMetadata.siteUrl}/${edge.node.frontmatter.slug}` },
                    { "category": `[${edge.node.frontmatter.tags.join(",")}]` },
                    { "pubDate": edge.node.frontmatter.update_date != 'Invalid date' ? edge.node.frontmatter.update_date : edge.node.frontmatter.date},
                    //{ "content:encoded": edge.node.html }
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        pagetitle
                        summary
                        date(formatString: "ddd, D MMM YYYY h:mm:ss ZZ")
                        update_date(formatString: "ddd, D MMM YYYY h:mm:ss ZZ")
                        tags
                        slug
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
            title: "Arabic Blog",
            feed_url: `https://arabicblog.info/feed.xml`,
            site_url: `https://arabicblog.info/`,
          },
        ],
      },
    },
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
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: DENY',
            'X-XSS-Protection: 1; mode=block',
            'X-Content-Type-Options: nosniff',
            `Content-Security-Policy: ${directivesToCspHeader(cspDirectives)}`,
            'Referrer-Policy: no-referrer-when-downgrade'
          ]
        }
      }
    }
    
  ],
}
