import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import BackCustom from '../components/BackCustom';
import MainScreen from '../screens/MainScreen';
import AlbumScreen from '../screens/AlbumScreen';


const Navigation =  StackNavigator({
  Main: { screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: 'rgb(255, 255, 255)',
        shadowOpacity: 0,
      },
      headerTitleStyle:{
        	fontWeight:'300',
        	fontSize:22,
        	marginTop:5,
        	alignSelf:'center',
          color: 'rgb(100, 100, 100)',
      }
    })
   },
  Album: {
    screen: AlbumScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackCustom nav={navigation} />,
      headerStyle: {
        backgroundColor: 'rgb(255, 255, 255)',
        shadowOpacity: 0,
        marginTop: 5
      },
      headerTitleStyle:{
        	fontWeight:'300',
        	fontSize:22,
        	marginTop:5,
        	alignSelf:'center',
          color: 'rgb(100, 100, 100)',
      },
    })

   },
});

export default Navigation;
