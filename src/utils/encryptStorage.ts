import * as Keychain from 'react-native-keychain';

const storeSession = async (key: string, token: string) => {
  try {
    await Keychain.setGenericPassword(key, token);
  } catch (error) {
    console.error('session storage error ::: ', error);
    throw new Error('Failed to store session tokens!');
  }
};

const retrieveSession = async () => {
  try {
    const creds = await Keychain.getGenericPassword();
    if (creds) {
      return creds;
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
