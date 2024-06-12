# NHS login Help Centre

The NHS login help centre is where you can find helpful information, guidance, and support for issues with NHS login.

## Notes

Do not change the Zendesk client ID keys in src/\_data/clients.json as it would mess up zendesk reporting.

If you try to test a contact form request with an error code locally with the dev server e.g. http://localhost:8080/contact?error=CID7023
then if it keeps redirecting you to http://localhost:8080/contact then try accessing it through http://localhost:8080/contact/?error=CID7023.

## Setup

- `npm install` to install dependencies
- `npm run dev` to run locally at `localhost:3000`
- `npm run build` to build

## Deployment

There are two pipelines in the NHS login AWS account:

- helpcentre-live-develop runs from develop branch, deploys to [dev](https://help.dev.signin.nhs.uk).
- helpcentre-live-master runs from master branch, deploys to [qa](https://help.qa.signin.nhs.uk) and afterwards to [production](https://help.login.nhs.uk).

No other environments exist, so we don't do feature branch testing. Testing can be done locally before merging to develop.

## Structure

File structure is as follows:

- `/src/app/page.tsx`: Home page, with other page.tsx files in subfolders according to routing
- `/src/lib`: Contains the logic for generating page html from markdown files, see [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- `/src/**/*.md`: Page content for articles and hubs (may contain html where needed)
- `/src/app/_components`: React components for use in pages
- `/public/images` asset folders for favicons etc

### Hub pages

These pages are nested version of the main hub used for navigation.
They require the following keys and no content to set up the hub pages, and are usually in index files. The app structure is based on the metadata, using 'type' and 'parent' fields, not according to the directories, but kept in a sensible directory structure for convenience.

- `title`: Page title
- `short_title`: Name to be used in the navigation menu
- `subtitle`: A description of the Hub
- `pageName`: The page name sent to analytics, minus "nhs:cid:help-centre:", should be all lowercase with dashes
- `name`: the id of the hub
- `type`: Always `hub`
- `layout`: no longer needed, can be removed
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
- `layout`: no longer needed, can be removed

## Useful links

[Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

[Server and Client Components](https://nextjs.org/learn/react-foundations/server-and-client-components)

[Dynamic Routing](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)
