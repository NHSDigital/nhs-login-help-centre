const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { isArticle, addArticleData, getContactUsLinks } = require('./lib/article');
const { isHub, addHubData, addHubToCollection } = require('./lib/hub');
const { addBreadcrumbs } = require('./lib/breadcrumbs');
const { collectionToKeyedObject } = require('./lib/utils');

/* Markdown Overrides */
const markdownLibrary = markdownIt({
  html: true,
  breaks: true
}).use(markdownItAnchor, {
  permalink: false
});

module.exports = function(config) {
  config.addLayoutAlias('default', 'layouts/base.njk');
  // pass some assets right through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/css');
  config.addPassthroughCopy('./src/js');

  config.addCollection('articles', collections => {
    const allPages = collections.getAll();
    return allPages
      .filter(isArticle)
      .map(addArticleData)
      .map(article => addBreadcrumbs(allPages, article))
      .reduce(collectionToKeyedObject, {});
  });

  config.addCollection('hubs', collections => {
    const allPages = collections.getAll();
    return allPages
      .filter(isHub)
      .map(hub => addHubData(allPages, hub))
      .map(hub => addBreadcrumbs(allPages, hub))
      .reduce(addHubToCollection, {});
  });

  config.addCollection('contactUsLinks', collections => (
    collections
      .getAll()
      .filter(isArticle)
      .map(getContactUsLinks)
      .reduce((collection, links) => collection.concat(links), [])
));


  config.setLibrary('md', markdownLibrary);

  return {
    dir: {
      input: 'src/',
      output: '_site',
      data: '_data/'
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
    pathPrefix: ''
  };
};
