const withDefaults = require(`./src/util/default-options`)

module.exports = themeOptions => {

  const {basePath, trackingId, postsPath, postsPerPage, imagesPath, mailchimpURL} = withDefaults(themeOptions)
  
  let showSubscriptionWidget = true
  if (mailchimpURL === "") {
    showSubscriptionWidget = false
  } 
  
  return {
    siteMetadata: {
      // Final blog https://github.com/hidjou/classsed-gatsby-blog/
      title: `Blog Title`,
      description: `Blog Description`,
      author: `Author Name`,
      twitterId: `TwitterID`,
      siteUrl: `https://kamranali.in`,
      genre: 'Genre of blog to be used in Google structured data',
      keywords: [`Keyword 1`],
      email: `admin@domain.info`,
      social: [
        'https://www.facebook.com/pagelink/',
        'https://twitter.com/handle'
      ], // Array of Social links to be passed in Google structured data
      contactSupport: 'Support URL to be used in Google structured data',
      bingId: 'bingID', // This ID is used as metaTag to verify the ownership of site. If you do NOT have one leave it as '' and we will not include it in meta tag
      menuLinks: [{name: 'Tags', link: '/tags/'}], // Array of top Navigation bar items. Make sure you have pages corresponding to the value of `link`

      // Footer Customizations
      footerLinks: [{name: 'About', link: '/about/'}, {name: 'Terms of Use', link: '/terms-of-use/'}, {name: 'Privacy Policy', link: '/privacy-policy/'}],
      displayFooterMessage: true,
      comments: 'true', // Enable/Disable comments
      options : {
        basePath,
        paginate: postsPerPage,
        showSubscriptionWidget,
        mailchimpURL
      }
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-sitemap`,
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: trackingId,
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
              title: "Blog Title",
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
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: postsPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: imagesPath,
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
          defaultLayouts: {
            [postsPath]: require.resolve("./src/templates/single-post.js")
          },
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
                aliases:{sh: "bash", js:"javascript"}
              },
            },
            {
              resolve: `gatsby-remark-katex`,
              options: {
                strict: `ignore`
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
    ],
  }
}
