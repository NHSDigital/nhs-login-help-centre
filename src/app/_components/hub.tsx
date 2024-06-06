import { MarkdownDocument } from '@/lib/api';
import Header from './header';
import Breadcrumbs from './breadcrumbs';

export default async function Hub({ hub, articles }: Props) {
  return (
    <>
      <Header></Header>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <Breadcrumbs post={hub}></Breadcrumbs>
              <h1>{hub.title}</h1>
              <div className="nhsuk-grid-row nhsuk-panel-group nhsuk-u-margin-bottom-0">
                {articles
                  .filter((article) => article.type === 'article')
                  .sort((a, b) => (a.position >= b.position ? 1 : -1))
                  .map((article) => (
                    <div
                      className="nhsuk-grid-column-one-half nhsuk-panel-group__item nhsuk-u-margin-0"
                      key={article.title}
                    >
                      <div className="nhsuk-promo nhsuk-u-margin-bottom-5">
                        <a className="nhsuk-promo__link-wrapper" href={article.slug}>
                          <div className="nhsuk-promo__content">
                            <h2 className="nhsuk-promo__heading">{article.title}</h2>
                            <p className="nhsuk-promo__description">{article.subtitle}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

type Props = {
  hub: MarkdownDocument;
  articles: MarkdownDocument[];
};
