const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { isArticle, addArticleData, getContactUsLinks } = require('./lib/article');
const { isHub, addHubData, addHubToCollection } = require('./lib/hub');
const { addBreadcrumbs } = require('./lib/breadcrumbs');
const { collectionToKeyedObject } = require('./lib/utils');
const outputDir = './_site/';
const fs = require('fs');
const lunr = require('lunr');
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
    const contactUsLinks = collections
      .getAll()
      .filter(isArticle)
      .map(article => getContactUsLinks(article))

    const resolvedContactUsLinks = [];

    for await (let link of contactUsLinks) {
      resolvedContactUsLinks.push(link);
    }
    return resolvedContactUsLinks
      .reduce((collection, links) => collection.concat(links), [])
  });


  config.setLibrary('md', markdownLibrary);

  config.addPassthroughCopy({
    'node_modules/lunr/lunr.min.js': 'js/lunr.js',
    'node_modules/fuse.js/dist/fuse.min.js': 'js/fuse.js',
    'node_modules/dompurify/dist/purify.min.js': 'js/purify.js',
  });

  config.on('afterBuild', () => {
    const FUSE_ENABLED = false;

    let data = fs.readFileSync(outputDir + 'js/search_data.json', 'utf-8');
    let docs = JSON.parse(data);
    let searchIndex;

    if (FUSE_ENABLED) {
      const fuseIndex = Fuse.createIndex(['id', 'title', 'content'], docs)
      searchIndex = fuseIndex;
    } else {
      let lunrIndex = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('content');

        docs.forEach(function (doc, idx) {
          doc.id = idx;
          this.add(doc);
        }, this);
      });
      searchIndex = lunrIndex;
    }

    fs.writeFileSync(outputDir + 'js/search_index.json', JSON.stringify(searchIndex.toJSON()));
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
