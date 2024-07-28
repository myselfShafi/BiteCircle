import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-native-paper';
import AppNavigator from './navigation/navigator';
import {useAppTheme} from './themes/theme';

function App(): React.JSX.Element {
  const appTheme = useAppTheme();

  return (
    <Provider theme={appTheme}>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
