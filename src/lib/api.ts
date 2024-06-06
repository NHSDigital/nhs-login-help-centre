import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const srcDirectory = join(process.cwd(), '/src');

export function getAllFiles() {
  const files = fs.readdirSync(srcDirectory, { recursive: true });
  return files.filter((fileName) => fileName && fileName.toString().endsWith('.md')) as string[];
}

export function getContentOrIndex(slug: string) {
  const topLevel = fs.readdirSync(srcDirectory);
  if (topLevel.includes(slug + '.md')) {
    return getContent(slug);
  }
  return getContent(slug + '/index');
}

export function getContent(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(srcDirectory, `${realSlug}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content: markdownContent } = matter(fileContents);

  return { ...data, slug: realSlug, markdownContent } as MarkdownDocument;
}

export function getAllArticles(): MarkdownDocument[] {
  const documents = getAllFiles();
  const articles = documents
    .map((slug) => getContent(slug))
    .sort((a1, a2) => (a1.position > a2.position ? -1 : 1));
  return articles;
}

export function getAllHubs(): MarkdownDocument[] {
  const documents = getAllFiles();
  const hubs = documents
    .map((slug) => getContent(slug))
    .filter((doc) => doc.type === 'hub' || doc.slug.indexOf('/') === -1)
    .sort((hub1, hub2) => (hub1.position > hub2.position ? -1 : 1));
  return hubs;
}

export function getHomePageLinks(): MarkdownDocument[] {
  const documents = getAllFiles();
  return documents
    .map((slug) => getContent(slug))
    .filter((a) => a.hub === 'home')
    .sort((a1, a2) => (a1.position > a2.position ? 1 : -1));
}

export type MarkdownDocument = {
  title: string;
  subtitle: string;
  short_title: string;
  pageName: string;
  type: 'article' | 'hub';
  hub: string;
  position: number;
  layout: string;
  markdownContent: string;
  slug: string;
  name: string;
};
