function isValidToken({
  accesstoken,
  refreshtoken,
}: {
  accesstoken?: string;
  refreshtoken?: string;
}): {
  isAccessTokenValid?: boolean;
  isRefreshTokenValid?: boolean;
} {
  const currentTime = Math.floor(Date.now() / 1000);

  const result: {
    isAccessTokenValid?: boolean;
    isRefreshTokenValid?: boolean;
  } = {};

  try {
    if (accesstoken) {
      const accessTokenPayload = JSON.parse(atob(accesstoken.split('.')[1]));
      result.isAccessTokenValid = accessTokenPayload.exp > currentTime;
    }

    if (refreshtoken) {
      const refreshTokenPayload = JSON.parse(atob(refreshtoken.split('.')[1]));
      result.isRefreshTokenValid = refreshTokenPayload.exp > currentTime;
    }
  } catch (error) {
    result.isAccessTokenValid = false;
    result.isRefreshTokenValid = false;
  }

  return result;
}

export default isValidToken;
