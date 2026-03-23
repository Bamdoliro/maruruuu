import type { SVGProps } from 'react';
import React from 'react';

const IconImage = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9 25H23C24.1 25 25 24.1 25 23V9C25 7.9 24.1 7 23 7H9C7.9 7 7 7.9 7 9V23C7 24.1 7.9 25 9 25ZM12.5 11C13.33 11 14 11.67 14 12.5C14 13.33 13.33 14 12.5 14C11.67 14 11 13.33 11 12.5C11 11.67 11.67 11 12.5 11ZM9 21.41L12 18.41L13.29 19.7C13.68 20.09 14.31 20.09 14.7 19.7L19.99 14.41L22.99 17.41V23H8.99V21.41H9Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconImage;
