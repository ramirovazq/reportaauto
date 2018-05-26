import React, { Component } from 'react';
import { Alert, Text, AppRegistry, Button, StyleSheet, View } from 'react-native';


export default class LocacionTexto extends Component {

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.props.latitude}</Text>
        <Text>Longitude: {this.props.longitude}</Text>
        {this.props.camera_enable ? <Text>Camera si :D</Text> : <Text>Camera NO :(</Text>}
        {this.props.gps_error ? <Text>Error: {this.props.gps_error}</Text> : null}
      </View>
    );
  }
}
