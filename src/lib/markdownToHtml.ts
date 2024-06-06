import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeHeadings from './rehype-headings';

export default async function markdownToHtml(markdown: string) {
  const vfile = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeHeadings)
    .use(rehypeStringify)
    .process(markdown);
  return { headings: vfile.data.headings, htmlString: vfile.value } as {
    headings: Array<{ depth: number; value: string; id: string; className: string }>;
    htmlString: string;
  };
}
