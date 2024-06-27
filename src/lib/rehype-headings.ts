import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { heading } from 'hast-util-heading';

export default function rehypePlugin() {
  //@ts-ignore
  return (ast, file) => {
    const headings: { depth: number; value: string; content: string; data: { id: string } }[] = [];
    const contactLinks: { description: string; code: string }[] = [];

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
        if (isContactUsLink(node)) {
          contactLinks.push(getContactLinkInfo(node, headings[headings.length - 1].value));
        }
      }
    });
    file.data.headings = headings;
    file.data.contactLinks = contactLinks;
  };
}
const CONTACT_US_LINK_REGEX = /\/contact\?error=(\S+)/;

function isContactUsLink(node: { type: any; tagName: string; properties: { href: string } }) {
  return (
    node.tagName === 'a' && node.properties.href && CONTACT_US_LINK_REGEX.test(node.properties.href)
  );
}

function getContactLinkInfo(node: { properties: { href: any } }, headingText: string) {
  const [_, errorCode] = node.properties.href.match(CONTACT_US_LINK_REGEX);
  return {
    description: headingText.replace(`${errorCode}: `, ''),
    code: errorCode,
  };
}
