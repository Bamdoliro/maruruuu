const SESSION_CLEAR_URL = '/session/clear';

/**
 * 서버에서 이미 만료된 토큰 쿠키가 브라우저에 남아 있으면
 * layout이 이를 로그인 상태로 오판하므로, HttpOnly 쿠키를 만료시킨다.
 */
export const clearStaleSession = async () => {
  try {
    await fetch(SESSION_CLEAR_URL, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });
  } catch {
    // 쿠키 정리는 부가 작업이므로 실패해도 이후 흐름을 막지 않는다.
  }
};
