const { isFinite } = Number;

const isCategory = post =>
  Array.isArray(post.data.tags) && post.data.tags.includes("categories");

const sortByPosition = (a, b) => a.data.position - b.data.position || -1;

const convertToObject = (acc, current) => ({
  ...acc,
  [current.category]: current
});

module.exports = function(config) {
  config.addLayoutAlias("default", "layouts/base.njk");
  // pass some assets right through
  config.addPassthroughCopy("./src/images");
  config.addPassthroughCopy("./src/css");
  config.addPassthroughCopy("./src/js");

  config.addCollection("sortedCategories", collections =>
    collections
      .getAll()
      .filter(isCategory)
      .sort(sortByPosition)
  );

  config.addCollection("categoryData", collections =>
    collections
      .getAll()
      .filter(isCategory)
      .map(post => post.data)
      .reduce(convertToObject, {})
  );

  return {
    dir: {
      input: "src/",
      output: "_site",
      data: "_data/"
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
    pathPrefix: "/nhs-help-centre/"
  };
};
