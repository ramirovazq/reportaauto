import React, { Component } from 'react';
import { AppRegistry, Button, Alert, Image, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

import GPSButton from './components/GPSButton/GPSButton.js';
import CameraButton from './components/CameraButton/CameraButton.js';
import LocationText from './components/LocationText/LocationText.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // GPS
      gps_latitude: null,
      gps_longitude: null,
      gps_error: null,
      // Camera
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      cameraEnabled: false
    };//this.state

    this.getPositionGPS = this.getPositionGPS.bind(this);
    this.toggleCameraView = this.toggleCameraView.bind(this);
  }//constructor props

 async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    console.log('will mount ++++++++++++++++ ini');
    console.log(status);
    console.log(this.state.hasCameraPermission);
    console.log(this.state.cameraEnabled);
    console.log('will mount ++++++++++++++++ fin');
  }//async componentwillmount


  getPositionGPS(){
    console.log("obteniendo posicion: .... inicio ");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          gps_latitude: position.coords.latitude,
          gps_longitude: position.coords.longitude,
          gps_error: null,
        });
      },
      (error) => this.setState({ gps_error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    console.log("obteniendo posicion: .... fin ");
  }//getPositionGPS


  toggleCameraView(){
    this.setState(prevState => ({
      cameraEnabled: !prevState.cameraEnabled,
    }));
  }//toogleCameraView

  render() {
        const { hasCameraPermission } = this.state;
        const { cameraEnabled } = this.state;
        if (cameraEnabled === false) {
        return (
         <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center'}} > 
                <LocationText latitude={this.state.gps_latitude} longitude={this.state.gps_longitude} gps_error={this.state.gps_error}  camera_enable={this.state.cameraEnabled} />    
            </View>
            <View style={{flex: 2}}> 
                <GPSButton getPosition={this.getPositionGPS} />
            </View>
            <View style={{flex: 3, backgroundColor: 'steelblue'}}>
                <CameraButton  enableCamera={this.toggleCameraView} estadoCamara={this.state.cameraEnabled} />
            </View>
          </View>
        );
      } else {



        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>
              <Camera style={{ flex: 1 }} type={this.state.type}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.1,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.setState({
                        cameraEnabled: false
                      });
                    }}>
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                      {' '}Atras{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          );
        }



      } // else
  }//render

}//Component   

export default App;
