import type { SVGProps } from 'react';
import React from 'react';

const IconArrowBottom = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.9417 9.3398L12.4951 15.8058C12.4304 15.8705 12.3558 15.919 12.2714 15.9511C12.1875 15.9837 12.1003 16 12.0097 16C11.919 16 11.8315 15.9837 11.7471 15.9511C11.6633 15.919 11.5889 15.8705 11.5242 15.8058L5.0582 9.33981C4.90286 9.18446 4.8252 9.00324 4.82519 8.79612C4.82519 8.589 4.90934 8.40129 5.07762 8.23301C5.22002 8.07767 5.39788 8 5.61121 8C5.82507 8 6.00966 8.07767 6.165 8.23301L12.0097 14.0971L17.8737 8.23301C18.0161 8.09061 18.1909 8.01942 18.398 8.01942C18.6051 8.01942 18.7864 8.09709 18.9417 8.25243C19.097 8.40777 19.1747 8.589 19.1747 8.79612C19.1747 9.00324 19.097 9.18446 18.9417 9.3398Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconArrowBottom;
