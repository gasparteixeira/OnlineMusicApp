import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



class BackCustom extends Component {

  execute = () => {
    this.props.nav.goBack();
  }

  render() {
    return(
      <TouchableOpacity style={styles.buttonStyle} onPress={this.execute} >
         <Ionicons name="ios-arrow-back" size={36} color="#999" />
    </TouchableOpacity>
    )
  }
}
const styles = {
  buttonStyle: {
    left: 15
  }
}
export default BackCustom;
