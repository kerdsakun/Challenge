import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

//screeb
import { MainScreen } from './Main'
import { HomeScreen } from './Home'
// screen


const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    Home: HomeScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    mode: 'modal'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Navigation extends React.Component {
  render() {
    return <AppContainer />;
  }
};