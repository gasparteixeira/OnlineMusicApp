import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import axios from 'axios';

class ArtistList extends Component {
  state = { albums: [], text: null };

  albumsResult() {
    console.log('text', this.props);
  }

  render() {
    const { params } = this.props.name;
    console.log(this.props);
    return (
      <Text>Testando</Text>
    )
  }

};

export default ArtistList;
