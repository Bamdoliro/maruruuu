import type { SVGProps } from 'react';
import React from 'react';

const IconStrikeThrough = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M24 17V15H15C12.36 15 12 13.56 12 12C12 11.44 12.72 10 16 10C18.8 10 18.99 11.68 19 12.01H20L21 12C21 10.62 19.96 8 16 8C11.25 8 10 10.62 10 12C10 13.31 10.29 14.28 10.73 15H8V17H24ZM22 19H20C20 19.12 19.95 22 16 22C12.05 22 12.01 20.18 12 20H10C10 20 10.07 24 16 24C20.75 24 22 20.73 22 19Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconStrikeThrough;
