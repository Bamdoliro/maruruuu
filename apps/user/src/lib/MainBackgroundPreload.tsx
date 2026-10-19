'use client';

import { ROUTES } from '@/constants/common/constants';
import { usePathname } from 'next/navigation';

const MainBackgroundPreload = () => {
  const pathname = usePathname();

  if (pathname !== ROUTES.MAIN) return null;

  return (
    <link
      rel="preload"
      href="/images/school_background.webp"
      as="image"
      fetchPriority="high"
    />
  );
};

export default MainBackgroundPreload;
