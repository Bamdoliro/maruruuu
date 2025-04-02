import type { SVGProps } from 'react';
import React from 'react';

const IconEditDocument = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="none" {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.125 19.5V12.75H9.375"
        stroke="#70737C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.375 19.5H2.625"
        stroke="#70737C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.375 19.5V8.25H14.625"
        stroke="#70737C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.875 3.75H14.625V19.5H19.875V3.75Z"
        stroke="#70737C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconEditDocument;
