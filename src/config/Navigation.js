import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainScreen from '../screens/MainScreen';
import AlbumScreen from '../screens/AlbumScreen';


const Navigation =  StackNavigator({
  Main: { screen: MainScreen },
  Album: { screen: AlbumScreen },
});

export default Navigation;
