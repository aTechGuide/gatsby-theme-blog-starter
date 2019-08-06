const {slugify} = require('./src/util/UtilityFunctions')
const path = require('path')
const _ = require('lodash')

const fs = require('fs');
const zlib = require('zlib');
const iltorb = require('iltorb');
const glob = require('glob');

/*
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
*/
exports.onPostBuild = () =>
  new Promise((resolve, reject) => {
    try {
      const publicPath = path.join(__dirname, 'public');
      const options = { nodir: true };
      const gzippable = glob.sync(`${publicPath}/**/?(*.html|*.js|*.css|*.svg)`, options);
      gzippable.forEach((file) => {
        const content = fs.readFileSync(file);
        const zipped = zlib.gzipSync(content);
        fs.writeFileSync(`${file}.gz`, zipped);
        
        const brotlied = iltorb.compressSync(content);
        fs.writeFileSync(`${file}.br`, brotlied);
      });
    } catch (e) {
      reject(new Error('onPostBuild: Could not compress the files'));
    }

    resolve();
  });

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
          frontmatter {
            tags
            slug
          }
        }
      }
    }
  }
  `).then(res => {
      if(res.errors) return Promise.reject(res.errors)

      const posts = res.data.allMarkdownRemark.edges

      // Create Posts Pages
      createPosts(posts, createPage, templates);

      // Create Tags Page
      let tags = createTagsPage(posts, createPage, templates);

      // Create Tag Posts Pages
      createPagePerTag(tags, createPage, templates);

      // Pagination
      createPaginationPages(posts, createPage, templates);


  })
}

function createPaginationPages(posts, createPage, templates) {
  const postsPerPage = 2;
  const numberOfPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numberOfPages }).forEach((_, index) => {
    const isFirstPage = index === 0;
    const currentPage = index + 1;
    if (isFirstPage)
      return;
    createPage({
      path: `/page/${currentPage}`,
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
      path: `/tag/${slugify(tag)}`,
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
    path: '/tags',
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
 * - We are passing slug via context
 */
function createPosts(posts, createPage, templates) {
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: templates.singlePost,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });
}

