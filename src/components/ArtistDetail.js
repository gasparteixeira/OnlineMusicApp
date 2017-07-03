import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { List, ListItem, Icon } from "react-native-elements";
import axios from 'axios';
import Expo, { Audio } from 'expo';


class ArtistDetail extends Component {

  soundObject = new Expo.Audio.Sound();
  state = {
    tracks : null,
    error: null,
    isPlaying: false,
    trackId: null,
    playIcon: 'https://png.icons8.com/circled-play/ios7/50',
    pauseIcon: 'https://png.icons8.com/stop/ios7/50'
  }

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

 componentWillUnmount() {
   this.stopSound();
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



  playSound = async (track) => {
     if(this.state.isPlaying && this.state.trackId == track.id) {
       await this.soundObject.stopAsync();
       await this.soundObject.unloadAsync();
       this.setState({isPlaying : false, trackId: null});
       return null;
     }
     if(this.state.isPlaying) {
       await this.soundObject.stopAsync();
       await this.soundObject.unloadAsync();
       this.setState({isPlaying : false, trackId: null});
     }
      try {
          await this.soundObject.loadAsync({ uri: track.preview_url });
          await this.soundObject.playAsync();
          this.setState({isPlaying : true, trackId: track.id });
        } catch (error) {
          console.log('error', error);
        }
  };

  stopSound = async () => {
    if(this.state.isPlaying) {
      await this.soundObject.stopAsync();
      await this.soundObject.unloadAsync();
    }
  }



  render() {
    console.log('navegacao', this.props.navigation);
    return (
      <View style={styles.container}>
          <Image source={{uri : this.renderPhoto(this.props.artist)}} style={styles.imageStyle} />
          <Text style={styles.title}>{`Top 10 songs from ${this.props.artist.name}`}</Text>
          <FlatList
            data={this.state.tracks}
            renderItem={({ item }) => (
              <ListItem
                  onPress={() => {this.playSound(item)}}
                  style={item.preview_url ? styles.activeSong : styles.inactiveSong}
                  roundAvatar
                  title={`${item.name}`}
                  subtitle={item.duration_ms}
                  avatar={this.state.isPlaying && this.state.trackId == item.id ? { uri: this.state.pauseIcon } : { uri: this.state.playIcon }}
                  hideChevron
                />
            )}
            keyExtractor={item => item.id}
            extraData={this.state}
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
  trackContainerPlaying: {
    borderBottomWidth: 0,
    backgroundColor: '#eee'
  },
  separator: {
      height: 1,
      width: "100%",
      backgroundColor: "#ccc",
  },
  activeSong: {
    opacity: 1,
    padding: 5,
  },
  inactiveSong: {
    opacity: .5,
    padding: 5,
  }
}


export default ArtistDetail;
