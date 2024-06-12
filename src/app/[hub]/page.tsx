import { notFound } from 'next/navigation';
import { getAllArticles, getAllHubs, getContentOrIndex } from '@/lib/api';
import Hub from '@/app/_components/hub';
import Article from '../_components/article';
import { Metadata } from 'next';

export default async function Page({ params }: Params) {
  const post = getContentOrIndex(params.hub);

  if (post?.type === 'hub') {
    const articles = getAllArticles().filter((a) => a.hub === params.hub);
    return <Hub hub={post} articles={articles}></Hub>;
  } else if (post?.type === 'article') {
    return <Article post={post}></Article>;
  }
  return notFound();
}

type Params = {
  params: {
    hub: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getContentOrIndex(params.hub);

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
  const articles = getAllHubs();

  return articles.map((post) => ({
    hub: post.slug.replace('/index', ''),
  }));
}
