import {AxiosResponse} from 'axios';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {resetSession, storeSession} from './encryptStorage';
import {fetchDataProps} from './hooks/useCustomFetch';

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

const refreshAccessToken = async (
  oldRefreshToken: string,
  fetchData: (params: fetchDataProps) => Promise<AxiosResponse | undefined>,
) => {
  try {
    if (!oldRefreshToken) return null;
    const newTokens = await fetchData({
      method: 'POST',
      url: '/api/users/authenticate-user',
      data: {refreshToken: oldRefreshToken},
    });
    console.log({newTokens});
    if (!newTokens) return null;

    const {accessToken, refreshToken} = newTokens?.data;
    await resetSession();
    await storeSession('tokens', {accessToken, refreshToken});
    return accessToken;
  } catch (error) {
    throw new Error('Token refreshing Error ::: ' + error);
  }
};

export {isTokenValid, refreshAccessToken};
