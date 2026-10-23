import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

let shouldRestoreScroll = false;

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    shouldRestoreScroll = true;
  });
}

// 뒤로 가기가 아닌 링크 이동에서도 다음에 마운트되는 페이지의 스크롤을 복원하도록 요청합니다.
export const requestScrollRestoration = () => {
  shouldRestoreScroll = true;
};

const useScrollRestoration = (
  key: string,
  scrollRef: RefObject<HTMLElement>,
  isReady: boolean,
) => {
  const storageKey = `scroll-position:${key}`;
  const shouldRestoreRef = useRef<boolean | null>(null);
  const scrollTopRef = useRef(0);

  if (shouldRestoreRef.current === null) {
    shouldRestoreRef.current = shouldRestoreScroll;
  }

  useEffect(() => {
    shouldRestoreScroll = false;
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      scrollTopRef.current = element.scrollTop;
    };

    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
      sessionStorage.setItem(storageKey, String(scrollTopRef.current));
    };
  }, [scrollRef, storageKey]);

  useEffect(() => {
    if (!isReady || !shouldRestoreRef.current) return;
    shouldRestoreRef.current = false;

    const element = scrollRef.current;
    const savedScrollTop = Number(sessionStorage.getItem(storageKey));
    if (!element || !savedScrollTop) return;

    element.scrollTop = savedScrollTop;
    scrollTopRef.current = savedScrollTop;
  }, [isReady, scrollRef, storageKey]);
};

export default useScrollRestoration;
