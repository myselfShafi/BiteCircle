import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ErrorBoundary, FallbackMain} from './components/error-boundary';
import ThemeContextProvider from './context/Theme';
import AppNavigator from './navigation/navigator';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeContextProvider>
      <SafeAreaView style={{flex: 1}}>
        <ErrorBoundary fallback={<FallbackMain />}>
          <AppNavigator />
        </ErrorBoundary>
      </SafeAreaView>
    </ThemeContextProvider>
  );
}

export default App;
