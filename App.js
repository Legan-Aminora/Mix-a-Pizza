import React from 'react';
import { StyleSheet } from 'react-native';
import MainStack from './src/navigation/MainStack'

class App extends React.Component {
  render() {
    return (
      <MainStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
