module.exports = function(config) {
  config.addLayoutAlias('default', 'layouts/base.njk');
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
