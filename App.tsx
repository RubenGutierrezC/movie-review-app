import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import StackNavigation from './src/navigation/StackNavigation';
import {theme} from './src/theme';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <StackNavigation />
    </NativeBaseProvider>
  );
};

export default App;
