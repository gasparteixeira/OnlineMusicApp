import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ArtistDetail from '../components/ArtistDetail';

class AlbumScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.artist.name}`,
    headerTitleStyle: {
      color: '#666',
    },
    headerStyle : {
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
    }
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <ArtistDetail artist={params.artist}  token={params.token}/>
    )
  }
};

const styles = {
  headerStyle : {

  }
}

export default AlbumScreen;
