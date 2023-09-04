const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { addArticleData, isArticle, isArticleNjk, getContactUsLinks } = require('./lib/article');
const { isHub, addHubData, addHubToCollection } = require('./lib/hub');
const { addBreadcrumbs } = require('./lib/breadcrumbs');
const { collectionToKeyedObject } = require('./lib/utils');
const outputDir = './_site/';
const fs = require('fs');
const Fuse = require('fuse.js');

/* Markdown Overrides */
const markdownLibrary = markdownIt({
  html: true,
  breaks: true
}).use(markdownItAnchor, {
  permalink: false
});

module.exports = function (config) {
  config.addLayoutAlias('default', 'layouts/base.njk');
  // pass some assets right through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/css');
  config.addPassthroughCopy('./src/js');

  config.addCollection('articles', async function (collections) {
    const articles = collections
      .getAll()
      .filter(isArticle)
      .map(article => addArticleData(article))

    // resolve headings - article.template.inputContent is a Promise in eleventy v2
    articles.forEach(async x => x.headings = await x.headings)

    return articles
      .map(article => addBreadcrumbs(articles, article))
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

  config.addCollection('contactUsLinks', async collections => {
    const allCollections = collections.getAll();
    const contactUsLinks = allCollections
      .filter(isArticle)
      .map(article => getContactUsLinks(article));

    const contactUsLinksNjk = allCollections
      .filter(isArticleNjk)
      .map(({ data }) => ({
        description: data.errorDescription || 'UNKNOWN',
        code: data.errorCode,
      }))
      .filter(({ code }) => /^CID\d{4}$/.test(code));

    const allContactUsLinks = await Promise.all([...contactUsLinks, ...contactUsLinksNjk]);
    const flattenedLinks = allContactUsLinks.reduce(
      (collection, links) => collection.concat(links),
      []
    );
    return flattenedLinks;
  });

  config.setLibrary('md', markdownLibrary);

  config.addPassthroughCopy({
    'node_modules/fuse.js/dist/fuse.min.js': 'js/fuse.js',
    'node_modules/dompurify/dist/purify.min.js': 'js/purify.js',
  });

  config.on('afterBuild', () => {
    let data = fs.readFileSync(outputDir + 'js/search_data.json', 'utf-8');
    let docs = JSON.parse(data);
    const idx = Fuse.createIndex(['id', 'title', 'content'], docs)
    fs.writeFileSync(outputDir + 'js/search_index.json', JSON.stringify(idx.toJSON()));
  });

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
