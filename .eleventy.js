module.exports = function(config) {
  // Layout aliases can make templates more portable
  config.addLayoutAlias("default", "category-page.njk");
  // pass some assets right through
  config.addPassthroughCopy("./src/images");
  config.addPassthroughCopy("./src/css");
  config.addPassthroughCopy("./src/js");

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
