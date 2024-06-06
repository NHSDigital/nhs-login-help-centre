import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { heading } from 'hast-util-heading';

// based on https://github.com/kazushisan/rehype-mdx-headings
//@ts-ignore
export const headings = (root) => {
  //@ts-ignore
  const headingList = [];
  visit(root, 'heading', (node) => {
    const heading = {
      depth: node.depth,
      value: toString(node, { includeImageAlt: false }),
    };
    // Other remark plugins can store arbitrary data
    // inside a node's `data` property, such as a
    // custom heading id.
    const data = node?.data;
    if (data) {
      //@ts-ignore
      heading.data = data;
    }
    headingList.push(heading);
  });
  //@ts-ignore
  return headingList;
};

export default function rehypeHeadings() {
  //@ts-ignore
  return (ast, file) => {
    const headings: Array<{ depth: number; value: string; content: string; data: { id: string } }> =
      [];
    visit(ast, (node) => {
      if (heading(node)) {
        const value = toString(node);
        const depth = parseInt(node.tagName.slice(1, 2), 10);
        if (!value || isNaN(depth)) {
          return;
        }
        headings.push({ depth, value, content: value, ...node.properties } as any);
      } else if (headings.length) {
        headings[headings.length - 1].content =
          headings[headings.length - 1].content + ' ' + toString(node);
      }
    });
    file.data.headings = headings;
  };
}
