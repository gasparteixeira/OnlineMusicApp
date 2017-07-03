import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

class HeaderSearch extends Component {
  state = { text: '', isFocused: false}

  cancelAction() {
    console.log(this.state.text);
  }
  clearText (searchInput) {
    this.refs[searchInput].setNativeProps({text: ''});
    this.setState({text: '', isFocused: false});
  }
   render() {
     return (
       <View style={styles.container}>
          <TextInput
            ref={'searchInput'}
            style={styles.input}
            placeholder="Search for an artist..."
            placeholderTextColor='#999'
            returnKeyType='search'
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={() => this.props.onSubmitingSearch(this.state.text)}
            underlineColorAndroid='transparent'
            onFocus={() => this.setState({isFocused: true})}
            onBlur={() => this.cancelAction()}
          />
          { this.state.isFocused ?
            <TouchableOpacity style={styles.cancelButton} onPress={() => this.clearText('searchInput')}>
              <Text>cancel</Text>
            </TouchableOpacity>
            : null
          }

     </View>
     )
   }
};

const styles = {
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2
  },
  cancelButton: {
    marginLeft: 5,
    backgroundColor: '#999',
    padding: 5,
  }
}

export default HeaderSearch;
