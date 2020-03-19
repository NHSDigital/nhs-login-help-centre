const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const ARTICLE_SECTION_REGEX = /^#+([^#)]+)$/gm;
const TRAILING_SLASH_REGEX = /\/$/;
const RULER_REGEX = /^(-{3,}|\*{3,}|_{3,})$/;

const getHeadingData = article =>
  article.template.inputContent
    .match(ARTICLE_SECTION_REGEX)
    .map(section => {
      const [title, ...content] = section
        .replace(ARTICLE_SECTION_REGEX, '$1')
        .trim()
        .split('\n');

      const fragment = title
        .replace(' ', '-')
        .toLowerCase();

      const text = content
        .filter(t => t.replace(RULER_REGEX, ''))
        .join(' ');

      const url = article.url
        .replace(TRAILING_SLASH_REGEX, '#' + fragment);

      return { title, text, url, fragment };
    });

/* Markdown Overrides */
const markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true
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
      .filter(
        post => post.data.type === 'article'
      )
      .sort(
        (a, b) => a.data.position - b.data.position
      )
      .map(article => {
        // trying to clone article via ... throws an error
        article.headings = getHeadingData(article);
        return article;
      })
  );

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
    pathPrefix: '/nhs-help-centre/'
  };
};
