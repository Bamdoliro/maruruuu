import type { CSSProperties, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  label?: string | React.ReactNode;
  errorMessage?: string;
  message?: string;
  textAlign?: CSSProperties['textAlign'];
  isError?: boolean;
  count?: string;
}
