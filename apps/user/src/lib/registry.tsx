'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

interface RegistryProps {
  children: ReactNode;
}

const StyledComponentRegistry = ({ children }: RegistryProps) => {
  const [styledComponentStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentStyleSheet.getStyleElement();

    styledComponentStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};
