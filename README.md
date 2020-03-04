# NHS Help Centre
Help pages for lost users

## Setup
- `npm install`
- `npm start`
- `npm build` to build 

## Deployment
This repo is automatically deployed when code is merged to master. Deployment code is located in `.github/workflows/11ty-build.yml`.

## Structure
File structure is as follows: 

- `/src/index.njk`: Main hub page, lists all pages with the categories tag
- `/src/**/index.md`: Category list pages, most of the heavy lifting is done in `/src/_include/layouts/category-index.njk`
- `/src/**/*.md`: Articles, most of the heavy lifting is done in `/src/_include/layouts/category-page.njk`
- `/src/images, /src/css, /src/js` asset folders

### Category list pages
These pages generate a list of articles for the value given in `category` key.
They require the following keys and no content: 

- `title`: Page title
- `tags`:  must be `categories` for it to appear on the hub page
- `subtitle`: description used on the hub page
- `category`: tag to search for when listing articles
- `layout`: must be `layouts/category-index.njk` for the page to have the correct styles
- `position`: determines the position on the hub page

### Article pages
These pages place their content in a artcle page template that generates related content and breadcrumbs
They require the following keys:

- `title`: Page title, also appears on the category list page
- `tags`: allows it to appear on the category list page
- `layout`: must be `layouts/category-page.njk` for the page to have the correct styles

## Useful links
The 11ty is as of writing fairly poor, heres some links to help:

- [Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html)
- [example projects](https://www.11ty.dev/docs/starter/)
- [Useful basic example](https://github.com/philhawksworth/eleventyone)
- [Global page data refrence](https://www.11ty.dev/docs/data-eleventy-supplied/)

They are two custom collections added into this project:

- `collections.sortedCategories`: List of categories sorted by the position key
- `collections.categoryData`: The category data keyed by the category name