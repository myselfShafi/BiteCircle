import React from 'react';
import {SafeAreaView} from 'react-native';
import ThemeContextProvider from './context/Theme';
import AppNavigator from './navigation/navigator';

function App(): React.JSX.Element {
  return (
    <ThemeContextProvider>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </ThemeContextProvider>
  );
}

export default App;
