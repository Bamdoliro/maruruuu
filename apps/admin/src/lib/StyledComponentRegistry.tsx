'use client';

import type { ReactNode } from 'react';

interface RegistryProps {
  children: ReactNode;
}

const EmotionRegistry = ({ children }: RegistryProps) => {
  return <>{children}</>;
};

export default EmotionRegistry;
