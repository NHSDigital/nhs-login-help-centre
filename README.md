# NHS login Help Centre

The NHS login help centre is where you can find helpful information, guidance, and support for issues with NHS login.

## Notes

Do not change the Zendesk client ID keys in src/_data/clients.json as it would mess up zendesk reporting.

If you try to test a contact form request with an error code locally with the dev server e.g. http://localhost:8080/contact?error=CID7023 
then if it keeps redirecting you to http://localhost:8080/contact then try accessing it through http://localhost:8080/contact/?error=CID7023.

## Setup

- `npm install` to install dependencies
- `npm start` to run locally at `localhost:8080`
- `npm build` to build

## Deployment

There are two pipelines in the NHS login AWS account:
- helpcentre-live-develop runs from develop branch, deploys to [dev](https://help.dev.signin.nhs.uk).
- helpcentre-live-master runs from master branch, deploys to [qa](https://help.qa.signin.nhs.uk) and afterwards to [production](https://help.login.nhs.uk).

No other environments exist, so we don't do feature branch testing. Testing can be done locally before merging to develop.

## Structure

File structure is as follows:

- `/src/index.njk`: Main hub page, lists all pages with the categories tag
- `/src/**/index.md`: Category list pages, most of the heavy lifting is done in `/src/_include/layouts/category-index.njk`
- `/src/**/*.md`: Articles, most of the heavy lifting is done in `/src/_include/layouts/category-page.njk`
- `/src/images, /src/css, /src/js` asset folders

### Hub pages

These pages are nested version of the main hub used for navigation.
They require the following keys and no content to set up the hub pages, the keys can be found in the index files for each hub:

- `title`: Page title
- `subtitle`: A description of the Hub
- `pageName`: The page name sent to analytics, minus "nhs:cid:help-centre:", should be all lowercase with dashes
- `name`: the id of the hub
- `type`: Always `hub`
- `layout`: Always `layouts/hub.njk`
- `hub`: the name of the parent hub page (`home` for the home page)
- `position`: determines the position on the parent hub page

### Article pages

These pages place their content in the article page template that generates related the side menu and breadcrumbs.
They require the following keys contained at the top of every article:

- `title`: Page title
- `subtitle`: A description of the page
- `pageName`: The page name sent to analytics, minus "nhs:cid:help-centre:", should be all lowercase with dashes
- `type`: Always `article`
- `hub`: The Hub page that the article page will appear on
- `position`: The position on the hub page
- `layout`: Always `layouts/article.njk`

## Useful links

The 11ty documentation is as of writing fairly poor, here are some links to help:

- [Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html)
- [example projects](https://www.11ty.dev/docs/starter/)
- [Useful basic example](https://github.com/philhawksworth/eleventyone)
- [Global page data refrence](https://www.11ty.dev/docs/data-eleventy-supplied/)
