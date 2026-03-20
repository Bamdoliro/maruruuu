import DOMPurify from 'isomorphic-dompurify';

const convertLink = (content: string): string => {
  const pattern = /(https?:\/\/\S+)/g;

  const html = content
    .replace(pattern, '<a href="$1" class="link" rel="noopener noreferrer">$1</a>')
    .replace(/\n/g, '<br />');

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'br'],
    ALLOWED_ATTR: ['href', 'class', 'rel'],
  });
};

export default convertLink;
