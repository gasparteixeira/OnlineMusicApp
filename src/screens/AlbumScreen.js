import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ArtistDetail from '../components/ArtistDetail';

class AlbumScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.artist.name}`,
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <ArtistDetail artist={params.artist} navigation={this.props.navigation}  token={params.token}/>
    )
  }
};

const styles = {
  headerStyle : {

  }
}

export default AlbumScreen;
