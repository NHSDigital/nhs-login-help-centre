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

### Hub pages
These pages are nested version of the main hub used for navigation
They require the following keys and no content:

- `title`: Page title
- `subtitle`: A description of the Hub
- `type`: Always `hub`
- `layout`: Always `layouts/hub.njk`
- `hub`: the name of the parient hub page (`home` for the home page)
- `position`: determines the position on the parient hub page

### Article pages
These pages place their content in the artcle page template that generates related the sidemenu and breadcrumbs
They require the following keys:

- `title`: Page title
- `subtitle`: A description of the page
- `type`: Always `article`
- `hub`: The Hub page that the article page will appear on
- `position`: The position on the hub page
- `layout`: Always `layouts/article.njk`

## Useful links
The 11ty is as of writing fairly poor, heres some links to help:

- [Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html)
- [example projects](https://www.11ty.dev/docs/starter/)
- [Useful basic example](https://github.com/philhawksworth/eleventyone)
- [Global page data refrence](https://www.11ty.dev/docs/data-eleventy-supplied/)
