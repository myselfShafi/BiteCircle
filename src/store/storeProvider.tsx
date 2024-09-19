import {Provider, ProviderProps} from 'react-redux';
import store from './store';

const StoreProvider = ({children}: {children: ProviderProps['children']}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
