import React from 'react';
import {SafeAreaView} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import AppNavigator from './navigation/navigator';
import {useAppTheme} from './themes/theme';

function App(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
