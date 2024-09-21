import {jwtDecode, JwtPayload} from 'jwt-decode';
import {resetSession, storeSession} from './encryptStorage';
import useCustomFetch from './hooks/useCustomFetch';

const isTokenValid = (token: string) => {
  try {
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) {
      return false;
    }
    return decodedToken?.exp * 1000 > Date.now(); // `exp` field is in seconds, so multiply by 1000
  } catch (error) {
    throw new Error('Token validation Error ::: ' + error);
  }
};

const refreshAccessToken = async (oldRefreshToken: string) => {
  const {fetchData} = useCustomFetch();
  try {
    if (!oldRefreshToken) return false;
    const newTokens = await fetchData({
      method: 'POST',
      url: '/api/users/authenticate-user',
      data: {oldRefreshToken},
    });
    if (!newTokens) return false;

    const {accessToken, refreshToken} = newTokens?.data;
    await resetSession();
    await storeSession('tokens', {accessToken, refreshToken});
    return accessToken;
  } catch (error) {
    throw new Error('Token refreshing Error ::: ' + error);
  }
};

export {isTokenValid, refreshAccessToken};
