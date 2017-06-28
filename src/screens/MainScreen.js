import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Navigator} from 'react-native';
import { List, ListItem } from "react-native-elements";
import axios from 'axios';
import HeaderSearch from '../components/HeaderSearch';

class MainScreen extends Component {

  state = {
      text: '',
      loading: false,
      albums: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      spotifyToken: null
    };

  static navigationOptions = {
    title: 'Find an Artist',
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
  };

    componentDidMount  () {
    const client = encodeURIComponent('client_credentials');
    const requestBody = `grant_type=${client}`;
    this.setState({ loading: true });
    fetch('https://accounts.spotify.com/api/token', {
      mode: 'no-cors',
      method: 'post',
      headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ZmRkOGIwMmJlYTc5NDRiM2IyYjgzMWIxYjgxZmYxOWM6MzU1ZjBiNjVkYmYzNGY3MmEwZGVmYTdmNjQ5OWJiMmI='
            },
      body: requestBody
        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({spotifyToken: responseJson.access_token})
        }).catch((error) => {
          this.setState({ error, loading: false });
        })

  }

  onSubmitingSearch (value) {
    this.setState({ loading: true });
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.spotifyToken}`;
    axios.get('https://api.spotify.com/v1/search', {
      params: { q: value, type: 'artist' }
    }).then(response => {
          this.setState({
            albums: response.data.artists.items,
            error: response.error || null,
            loading: false,
            refreshing: false
          })
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  renderPhoto(item) {
    var imageSource = 'http://orienteering.org/wp-content/uploads/2015/09/no-image-available.png';
    item.images.slice(2,3).map((row, i)=> {
      imageSource = row.url;
    });
    return imageSource;
  };

  renderSeparator = () => {
    return (
    <View style={styles.separator} />
    )
  };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={this.state.albums}
        renderItem={({ item }) => (
          <ListItem
              onPress={() => navigate('Album', {artist: item, token: this.state.spotifyToken})}
              roundAvatar
              title={`${item.name}`}
              subtitle={item.type}
              avatar={{ uri: this.renderPhoto(item) }}
              containerStyle={styles.container}
            />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={() => <HeaderSearch callbackParent={(newState) => this.onChildChanged(newState)} onSubmitingSearch={(value) => this.onSubmitingSearch(value)} />}
        refreshing={this.state.refreshing}
      />
    )
  }
};

const styles = {
  container: {
    borderBottomWidth: 0,
    backgroundColor: '#fff'
  },
  separator: {
      height: 1,
      width: "100%",
      backgroundColor: "#CED0CE",
  }
};

export default MainScreen;
