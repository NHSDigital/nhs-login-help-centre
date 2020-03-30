const cheerio = require('cheerio');
const markdown = require('markdown-it')();

const ARTICLE_SECTION_REGEX = /^(#+)([^#]+)$/gm;
const TRAILING_SLASH_REGEX = /\/$/;
const SPACE_REGEX = /\s/g;

const extractHeadingData = (article, section) => {
    const [title, ...content] = section
        .replace(ARTICLE_SECTION_REGEX, '$2')
        .trim()
        .split('\n');

    const textHtml = markdown.render(content.join(' '));
    const text = cheerio.load(textHtml).text();

    const fragment = encodeURIComponent(
        title.replace(SPACE_REGEX, '-').toLowerCase()
    )

    const url = article.url.replace(TRAILING_SLASH_REGEX, '#' + fragment);
    const level = section.replace(ARTICLE_SECTION_REGEX, '$1').length;

    return { title, text, url, fragment, level };
};

const getHeadings = article => (
    article.template.inputContent
        .match(ARTICLE_SECTION_REGEX)
        .map(section => extractHeadingData(article, section))
);

module.exports = {
    isArticle(post) {
        return post.data.type === 'article'
    },

    addArticleData(article) {
        // trying to clone article via ... throws an error
        article.headings = getHeadings(article);
        return article;
    }
}
