import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { List, ListItem } from "react-native-elements";
import axios from 'axios';

class ArtistDetail extends Component {

  state = { tracks : null, error: null}

 componentDidMount() {
   axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
   axios.get(`https://api.spotify.com/v1/artists/${this.props.artist.id}/top-tracks`, {
     params: { country: 'BR' }
   })
   .then(response => {
         this.setState({tracks: response.data.tracks });
     })
     .catch(error => {
       console.log('error', error);
     });
 }

  renderPhoto(artist) {
    let imageSource = 'http://orienteering.org/wp-content/uploads/2015/09/no-image-available.png';
    artist.images.slice(1,2).map((row, i)=> {
        imageSource = row.url;
    });
    return imageSource;
  }

  renderSeparator = () => {
    return (
    <View style={styles.separator} />
    )
  };

  onPlayTrack(track) {

    console.log(track.name);

  }



  render() {
    return (
      <View style={styles.container}>
          <Image source={{uri : this.renderPhoto(this.props.artist)}} style={styles.imageStyle} />
          <Text style={styles.title}>{`Top 10 songs from ${this.props.artist.name}`}</Text>
          <FlatList
            data={this.state.tracks}
            renderItem={({ item }) => (
              <ListItem
                  onPress={() => {this.onPlayTrack(item)}}
                  roundAvatar
                  title={`${item.name}`}
                  subtitle={item.duration_ms}
                  avatar={{ uri: 'https://image.flaticon.com/icons/png/128/117/117999.png' }}
                  containerStyle={styles.trackContainer}
                />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
          />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#333',
    padding: 10,
  },
  imageStyle: {
    height: 300,
    width: null,
  },
  trackContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#000'
  },
  separator: {
      height: 1,
      width: "100%",
      backgroundColor: "#ccc",
  }
}


export default ArtistDetail;