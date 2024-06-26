import { notFound } from 'next/navigation';
import { getAllArticles, getContent } from '@/lib/api';
import Article from '@/app/_components/server/article';

export default async function Page({ params }: Params) {
  const post = getContent(params.hub + '/' + params.article);

  if (!post) {
    return notFound();
  }

  return <Article post={post}></Article>;
}

type Params = {
  params: {
    hub: string;
    article: string;
  };
};

export function generateMetadata({ params }: Params) {
  const post = getContent(params.hub + '/' + params.article);

  if (!post) {
    return notFound();
  }

  return {
    title: post.title || 'NHS login Help centre',
    description:
      'The NHS login Help centre is where you can find helpful information, guidance, and support for issues with NHS login.',
    other: { pageName: post.pageName },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((post) => post.type === 'article')
    .map((post) => ({
      hub: post.slug.split('/')[0],
      article: post.slug.split('/')[1],
    }));
}
