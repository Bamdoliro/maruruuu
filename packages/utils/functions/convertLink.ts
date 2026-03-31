import DOMPurify from 'dompurify';

const convertLink = (content: string): string => {
  const pattern = /(https?:\/\/[^\s<>"']+)/g;

  const html = content
    .replace(
      pattern,
      '<a href="$1" class="link" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(/\n/g, '<br />');

  if (typeof window === 'undefined') return html;

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'br'],
    ALLOWED_ATTR: ['href', 'class', 'rel', 'target'],
    ALLOWED_URI_REGEXP: /^https?:\/\//i,
  });
};

export default convertLink;
