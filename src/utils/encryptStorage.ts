import * as Keychain from 'react-native-keychain';

const storeSession = async (key: string, token: object) => {
  try {
    await Keychain.setGenericPassword(key, JSON.stringify(token));
  } catch (error) {
    console.error('session storage error ::: ', error);
    throw new Error('Failed to store session tokens!');
  }
};

const retrieveSession = async () => {
  try {
    const creds = await Keychain.getGenericPassword();
    if (creds) {
      return {...creds, password: JSON.parse(creds.password)};
    } else {
      return null;
    }
  } catch (error) {
    console.error('session retrieve error ::: ', error);
  }
};

const resetSession = async (name: string) => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('session reset error ::: ', error);
  }
};

export {resetSession, retrieveSession, storeSession};
