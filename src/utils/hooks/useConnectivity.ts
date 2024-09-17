import {addEventListener, NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

const useConnectivity = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useConnectivity;
