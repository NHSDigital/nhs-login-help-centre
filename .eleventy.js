const ARTICLE_HEADING_REGEX = /^#+([^#)]+)$/gm;
const RULER_REGEX = /^(-{3,}|\*{3,}|_{3,})$/;

const sortByPosition = (a, b) => a.data.position - b.data.position || -1;

const isArticle = post => post.data.type === 'article';

const getHeadingData = (article) => (
  article.template.inputContent
    .match(ARTICLE_HEADING_REGEX)
    .map(s => {
      const heading = s.replace(ARTICLE_HEADING_REGEX, '$1').trim();
      const [title, ...content] = heading.split('\n');

      const url = article.url.replace(/\/$/, '');
      const fragment = title.replace(' ', '').toLowerCase();
      const text = content
        .filter(t => t.replace(RULER_REGEX, ''))
        .join(' ');

      return {
        title,
        text,
        fragment,
        url: url + '#' + fragment,
      }
    })
);

module.exports = function(config) {
  config.addLayoutAlias('default', 'layouts/base.njk');
  // pass some assets right through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/css');
  config.addPassthroughCopy('./src/js');

  config.addCollection('articles', collections => (
    collections
      .getAll()
      .filter(isArticle)
      .sort(sortByPosition)
      .map(article => {
        // trying to clone article via ... throws an error
        article.headings = getHeadingData(article);
        return article;
      })
  ));

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
