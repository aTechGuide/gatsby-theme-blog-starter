const {slugify} = require('./src/util/UtilityFunctions')
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const _ = require('lodash')
const withDefaults = require(`./src/util/default-options`)

exports.onPreBootstrap = ({ store, reporter }) => {
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

exports.createPages = async ({actions, graphql, reporter}, options) => {
  const {createPage} = actions;

  const templates = {
    tagsPage: require.resolve('./src/templates/tags-page.js'),
    tagPosts: require.resolve('./src/templates/tag-posts.js'),
    postList: require.resolve('./src/templates/post-list.js'),
  }

  const result = await graphql(`
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
    `)

  if(result.errors) {
    reporter.panic('Error loading Mdx Files', res.errors)
    return Promise.reject(res.errors)
  }

  const posts = result.data.allMdx.edges
  const {basePath, postsPerPage} = withDefaults(options)

  // Create Posts Pages
  createPosts(posts, createPage);

  // Create Tags Page
  let tags = createTagsPage(posts, createPage, templates, basePath);

  // Create Tag Posts Pages. 
  // Remember this peice is not taking posts from above query. If we change above query make sure we update the query of `createPagePerTag`
  createPagePerTag(tags, createPage, templates, basePath);

  // Pagination
  createPaginationPages(posts, createPage, templates, postsPerPage, basePath);
}

function createPaginationPages(posts, createPage, templates, postsPerPage, basePath) {
  
  postsPerPage = parseInt(postsPerPage)
  
  const numberOfPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numberOfPages }).forEach((_, index) => {
    const isFirstPage = index === 0;
    const currentPage = index + 1;
    createPage({
      path: isFirstPage === true ? (basePath === "/" ? `/` : `/${basePath}/`) : (basePath === "/" ? `/page/${currentPage}/` : `/${basePath}/page/${currentPage}/`),
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

function createPagePerTag(tags, createPage, templates, basePath) {
  tags.forEach(tag => {
    createPage({
      path: basePath === "/" ? `/tag/${slugify(tag)}/` : `/${basePath}/tag/${slugify(tag)}/`,
      component: templates.tagPosts,
      context: {
        tag
      }
    });
  });
}

function createTagsPage(posts, createPage, templates, basePath) {
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
    path: basePath === "/" ? '/tags/' : `/${basePath}/tags/`,
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

