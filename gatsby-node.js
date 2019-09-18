const {slugify} = require('./src/util/UtilityFunctions')
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const _ = require('lodash')

/*
exports.onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions

  if(node.internal.type === 'Mdx'){
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle,
    })
  }
}
*/

exports.onPreBootstrap = ({ store, reporter }, options) => {
  const { program } = store.getState()
  const dirs = [
    path.join(program.directory, "posts"),
    path.join(program.directory, "images")
  ]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  })
}

exports.createPages = ({actions, graphql, reporter}, options) => {
  const {createPage} = actions;

  const templates = {
    tagsPage: require.resolve('./src/templates/tags-page.js'),
    tagPosts: require.resolve('./src/templates/tag-posts.js'),
    postList: require.resolve('./src/templates/post-list.js'),
  }

  return graphql(`
  {
    allMdx(
      filter: {frontmatter: {published: {eq: true}}}
    ) {
      edges {
        node {
          fileAbsolutePath
          id
          frontmatter {
            tags
            slug
            image {
              publicURL
            }
          }
        }
      }
    }
  }
  `).then(res => {
      if(res.errors) {
        reporter.panic('Error loading Mdx Files', res.errors)
        return Promise.reject(res.errors)
      }

      const posts = res.data.allMdx.edges

      // Create Posts Pages
      createPosts(posts, createPage);

      // Create Tags Page
      let tags = createTagsPage(posts, createPage, templates);

      // Create Tag Posts Pages
      createPagePerTag(tags, createPage, templates);

      // Pagination
      createPaginationPages(posts, createPage, templates, options.postsPerPage);

  })
}

function createPaginationPages(posts, createPage, templates, postsPerPage) {
  
  if(postsPerPage === "undefined") {
    postsPerPage = 2
  } else {
    postsPerPage = parseInt(postsPerPage)
  }
  
  const numberOfPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numberOfPages }).forEach((_, index) => {
    const isFirstPage = index === 0;
    const currentPage = index + 1;
    createPage({
      path: isFirstPage === true ? `/` : `/page/${currentPage}/`,
      component: templates.postList,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        currentPage,
        numberOfPages
      }
    });
  });
}

function createPagePerTag(tags, createPage, templates) {
  tags.forEach(tag => {
    createPage({
      path: `/tag/${slugify(tag)}/`,
      component: templates.tagPosts,
      context: {
        tag
      }
    });
  });
}

function createTagsPage(posts, createPage, templates) {
  let tags = [];
  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.tags')) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  let tagPostCounts = {};
  tags.forEach(tag => {
    tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
  });
  // {code: 2, design: 6, ...}
  tags = _.uniq(tags);
  createPage({
    path: '/tags/',
    component: templates.tagsPage,
    context: {
      tags,
      tagPostCounts
    }
  });
  return tags;
}

/**
 * For each Node (i.e. mark down file) 
 * - We are creating a page having path = slug.
 */
function createPosts(posts, createPage) {
  posts.forEach(({ node }) => {
    createPage({
      path: `${node.frontmatter.slug}/`,
      component: node.fileAbsolutePath,
      context: {
        tags: node.frontmatter.tags,
        image: node.frontmatter.image.publicURL
      }
    });
  });
}

