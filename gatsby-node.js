/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const {slugify} = require('./src/util/UtilityFunctions')
const path = require('path')
const authors = require('./src/util/authors')
const _ = require('lodash')

exports.onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions

  if(node.internal.type === 'MarkdownRemark'){
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  const templates = {
    singlePost: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
    tagPosts: path.resolve('src/templates/tag-posts.js'),
    postList: path.resolve('src/templates/post-list.js'),
  }

  return graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            author
            tags
          }
        }
      }
    }
  }
  `).then(res => {
      if(res.errors) return Promise.reject(res.errors)

      // Create Posts Page
      const posts = res.data.allMarkdownRemark.edges

      posts.forEach(({node}) => {
        createPage({
          path: node.fields.slug,
          component: templates.singlePost,
          context: {
            slug: node.fields.slug,
            imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl
          }
        })
      })

      // Create Tags Page
      let tags = []
      _.each(posts, edge => {
        if(_.get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })

      let tagPostCounts = {}
      tags.forEach(tag => {
        tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
      })
      // {code: 2, design: 6, ...}

      tags = _.uniq(tags);

      console.log(tags);

      createPage({
        path: '/tags',
        component: templates.tagsPage,
        context: {
          tags,
          tagPostCounts
        }
      })

      // Create Tag Posts Pages
      tags.forEach(tag => {
        createPage({
          path: `/tag/${slugify(tag)}`,
          component: templates.tagPosts,
          context: {
            tag
          }
        })
      })

      // Pagination
      const postsPerPage = 2;
      const numberOfPages = Math.ceil(posts.length / postsPerPage);

      Array.from({length: numberOfPages}).forEach((_ , index) => {
        const isFirstPage = index === 0
        const currentPage = index + 1

        if(isFirstPage) return

        createPage({
          path: `/page/${currentPage}`,
          component: templates.postList,
          context: {
            limit: postsPerPage,
            skip: index * postsPerPage,
            currentPage
          }
        })



      })


  })
}
