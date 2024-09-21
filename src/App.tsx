import React from 'react';
import {SafeAreaView} from 'react-native';
import {ErrorBoundary, FallbackMain} from './components/error-boundary';
import ThemeContextProvider from './context/Theme';
import AppNavigator from './navigation/navigator';
import StoreProvider from './store/storeProvider';

function App(): React.JSX.Element {
  return (
    <ThemeContextProvider>
      <StoreProvider>
        <SafeAreaView style={{flex: 1}}>
          <ErrorBoundary fallback={<FallbackMain />}>
            <AppNavigator />
          </ErrorBoundary>
        </SafeAreaView>
      </StoreProvider>
    </ThemeContextProvider>
  );
}

export default App;
