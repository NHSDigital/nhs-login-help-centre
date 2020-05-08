const cheerio = require('cheerio');
const markdown = require('markdown-it')();

const ARTICLE_SECTION_REGEX = /^(#+)([^#]+)$/gm;
const TRAILING_SLASH_REGEX = /\/$/;
const SPACE_REGEX = /\s/g;
const CONTACT_US_TITLE_REGEX = /(?:[^\:]*: ?)?(.*)/;
const CONTACT_US_LINK_REGEX = /\/contact\?error=(\S+)/;

const extractSectionText = section => {
  const [title, ...rest] = section
    .replace(ARTICLE_SECTION_REGEX, '$2')
    .trim()
    .split('\n');

  return { title, content: rest.join(' ') };
};

const extractHeadingData = (article, section) => {
  const { title, content } = extractSectionText(section);
  const textHtml = markdown.render(content);
  const text = cheerio.load(textHtml).text();

  const fragment = encodeURIComponent(title.replace(SPACE_REGEX, '-').toLowerCase());

  const url = article.url.replace(TRAILING_SLASH_REGEX, '#' + fragment);
  const level = section.replace(ARTICLE_SECTION_REGEX, '$1').length;

  return { title, text, url, fragment, level };
};

const getHeadings = article =>
  article.template.inputContent
    .match(ARTICLE_SECTION_REGEX)
    .map(section => extractHeadingData(article, section));

const extractContactUsLink = section => {
  const { title, content } = extractSectionText(section);

  if (!content.match(CONTACT_US_LINK_REGEX)) {
    return null;
  }

  return {
    linkText: title.replace(CONTACT_US_TITLE_REGEX, '$1'),
    errorCode: content.match(CONTACT_US_LINK_REGEX)[1],
  };
};

module.exports = {
  isArticle(post) {
    return post.data.type === 'article';
  },

  addArticleData(article) {
    // trying to clone article via ... throws an error
    article.headings = getHeadings(article);
    return article;
  },

  getContactUsLinks(article) {
    return article.template.inputContent
      .match(ARTICLE_SECTION_REGEX)
      .map(extractContactUsLink)
      .filter(link => !!link);
  },
};
