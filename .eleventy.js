const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { isArticle, addArticleData } = require('./lib/article');
const { isHub, addHubData, addHubToCollection } = require('./lib/hub');
const { collectionToKeyedObject, sortByPosition } = require('./lib/utils');

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

  config.addCollection('articles', collections =>
    collections
      .getAll()
      .filter(isArticle)
      .map(addArticleData)
      .reduce(collectionToKeyedObject, {})
  );

  config.addCollection('hubs', collections => {
    const allPages = collections.getAll();
    const hubs = allPages
      .filter(isHub)
      .map(hub => addHubData(allPages, hub))
      .reduce(addHubToCollection, {});

    return {
      ...hubs,
      home: addHubData(allPages, {
        data: { name: 'home' }
      })
    };
  });


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
    pathPrefix: '/nhs-login-help-centre/'
  };
};
