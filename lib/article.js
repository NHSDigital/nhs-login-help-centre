const ARTICLE_SECTION_REGEX = /^(#+)([^#]+)$/gm;
const TRAILING_SLASH_REGEX = /\/$/;
const SPACE_REGEX = /\s/g;
const RULER_REGEX = /^(\-{3,}|\*{3,}|\_{3,})$/;

const extractHeadingData = (article, section) => {
    const [title, ...content] = section
        .replace(ARTICLE_SECTION_REGEX, '$2')
        .trim()
        .split('\n');

    const text = content
        .filter(t => t.replace(RULER_REGEX, ''))
        .join(' ');

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
