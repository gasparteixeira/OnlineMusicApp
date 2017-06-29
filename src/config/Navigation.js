import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import BackCustom from '../components/BackCustom';
import MainScreen from '../screens/MainScreen';
import AlbumScreen from '../screens/AlbumScreen';


const Navigation =  StackNavigator({
  Main: { screen: MainScreen },
  Album: {
    screen: AlbumScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackCustom nav={navigation} />,
    })

   },
});

export default Navigation;
