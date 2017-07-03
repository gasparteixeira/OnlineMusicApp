import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Navigator, Text, Alert} from 'react-native';
import { List, ListItem } from "react-native-elements";
import axios from 'axios';
import HeaderSearch from '../components/HeaderSearch';

class MainScreen extends Component {

  state = {
      text: '',
      loading: false,
      status: '',
      albums: [],
      result: -1,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      spotifyToken: null
    };

  static navigationOptions = {
    title: 'Find an Artist',
  };

  componentDidMount  () {
    this.getTheToken();

  }

  getTheToken() {
    const client = encodeURIComponent('client_credentials');
    const requestBody = `grant_type=${client}`;
    this.setState({ loading: true, status: 'cheking api access' });
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
            this.setState({spotifyToken: responseJson.access_token, loading: false, status: ''})
        }).catch((error) => {
          this.setState({ error, loading: false, status: ''});
        })
  }

  onSubmitingSearch (value) {
    this.setState({albums: [], loading: true, status: `searging for ${value}` });
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.spotifyToken}`;
    axios.get('https://api.spotify.com/v1/search', {
      params: { q: value, type: 'artist' }
    }).then(response => {
          this.setState({
            albums: response.data.artists.items,
            result: response.data.artists.items.length,
            error: response.error || null,
            loading: false,
            status: '',
            refreshing: false
          })
          if(response.data.artists.items.length == 0) {
            Alert.alert(
              'Opps.. something got wrong',
              `There was no result by the name ${value}. Try again.`,
            );
          }
      })
      .catch(error => {
        if(error.response.status == 401){
          this.getTheToken();
          Alert.alert(
            'Opps.. session started',
            `Try again.`,
          );
        }
        this.setState({ error, loading: false, status: '' });

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

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={{paddingVertical: 20, borderTopWidth: 1,borderColor: '#CED0CE'}} >
          <ActivityIndicator animating size='large'/>
          <Text style={styles.statusStyle}>{this.state.status}</Text>
      </View>
    )
  }


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
        ListFooterComponent={this.renderFooter}
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
  },
  statusStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
};

export default MainScreen;
