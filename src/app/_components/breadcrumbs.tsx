import { MarkdownDocument, getAllArticles } from '@/lib/api';

export default async function Breadcrumbs({ post }: Props) {
  if (!post.hub) {
    return null;
  }

  const pages = getAllArticles();
  const breadcrumbs = [];

  let current = post;

  while (current.hub && breadcrumbs.length <= pages.length) {
    if (current.hub === 'home') {
      breadcrumbs.unshift({ slug: '', title: 'NHS login Help centre' });
      break;
    }
    const next = pages.find((post) => post.name === current.hub);

    if (!next) break;

    breadcrumbs.unshift(next);
    current = next;
  }

  return (
    <nav
      className="nhsuk-breadcrumb"
      aria-label="Breadcrumb"
      style={{ backgroundColor: '#ffffff00', paddingBottom: '48px' }}
    >
      <ol className="nhsuk-breadcrumb__list">
        {breadcrumbs.map((link) => (
          <li className="nhsuk-breadcrumb__item" key={link.slug}>
            <a className="nhsuk-breadcrumb__link" href={'/' + link.slug.replace('/index', '')}>
              {link.title}
            </a>
          </li>
        ))}
      </ol>
      <p className="nhsuk-breadcrumb__back">
        <a className="nhsuk-breadcrumb__backlink"></a>
      </p>
    </nav>
  );
}

type Props = {
  post: MarkdownDocument;
};
