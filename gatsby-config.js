const cspDirectives = [
  "default-src 'self' https://disqus.com https://c.disquscdn.com",
  "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://arabic-blog.disqus.com",
  "frame-src https://disqus.com",
  "font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://c.disquscdn.com",
  "img-src 'self' data: https://www.google-analytics.com https://referrer.disqus.com https://c.disquscdn.com",
  "object-src 'none'"
];

const directivesToCspHeader = headers => headers.join(';');

module.exports = {
  siteMetadata: {
    // Final blog https://github.com/hidjou/classsed-gatsby-blog/
    title: `Blog Title`,
    description: `Blog Description`,
    author: `Author Name`,
    twitterId: `TwitterID`,
    siteUrl: `SiteURL`,
    genre: 'Genre of blog to be used in Google structured data',
    keywords: [`Keyword 1`, `Keyword 2`],
    email: `admin@domain.info`,
    paginate: `12`,
    social: [
      'https://www.facebook.com/pagelink/',
      'https://twitter.com/handle'
    ], // Array of Social links to be passed in Google structured data
    contactSupport: 'Support URL to be used in Google structured data',
    bingId: 'bingID', // This ID is used as metaTag to verify the ownership of site
    menuLinks: [{name: 'Name of Menu Item', link: '/link/'}] // Array of top Navigation bar items
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-27634418-5",
      },
    },
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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return({
                  title: edge.node.frontmatter.pagetitle,
                  description: edge.node.frontmatter.summary,
                  guid: `${site.siteMetadata.siteUrl}/${edge.node.frontmatter.slug}`,
                  custom_elements: [
                    { "link": `${site.siteMetadata.siteUrl}/${edge.node.frontmatter.slug}` },
                    { "category": `[${edge.node.frontmatter.tags.join(",")}]` },
                    { "pubDate": edge.node.frontmatter.update_date !== edge.node.frontmatter.date ? edge.node.frontmatter.update_date : edge.node.frontmatter.date},
                    //{ "content:encoded": edge.node.html }
                  ],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
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
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`, // Plugins For Image Processing
    `gatsby-plugin-sharp`, // Image Transformations; Sharp should be before we transform our mdx file
    {
      resolve: 'gatsby-plugin-mdx', // Requires to format mdx
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require("remark-attr")],
        plugins: [`gatsby-remark-images`], // <- Hack to make this plugin work properly
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false
            }
          },
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
