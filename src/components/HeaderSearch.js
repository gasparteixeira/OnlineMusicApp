import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class HeaderSearch extends Component {
  state = { text: ''}
   render() {
     return (
       <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Search for an artist..."
            placeholderTextColor='#999'
            returnKeyType='search'
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={() => this.props.onSubmitingSearch(this.state.text)}
          />
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
    borderRadius: 2,
  },
}

export default HeaderSearch;
