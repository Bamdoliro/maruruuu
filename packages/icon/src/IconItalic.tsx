import type { SVGProps } from 'react';

const IconItalic = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15 9H21M11 23H17M18 9L14 23"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconItalic;
