import { getAllArticles } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import SearchResult from '@/app/_components/search';
import Header from '@/app/_components/header';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'The NHS login Help centre is where you can find helpful information, guidance, and support for issues with NHS login.',
  other: { pageName: 'search' },
};

export default async function Search() {
  const searchData = await Promise.all(
    getAllArticles()
      .filter((f) => f.type === 'article')
      .map((file) =>
        markdownToHtml(file.markdownContent).then(({ headings }) => {
          return headings.map((heading) => ({ ...heading, slug: file.slug }));
        })
      )
  );
  return (
    <>
      <Header></Header>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" role="main">
          <div className="nhsuk-grid-row">
            <Suspense>
              <SearchResult searchData={searchData.flat()}></SearchResult>
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
}
