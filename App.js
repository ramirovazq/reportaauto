import React, { Component } from 'react';
import { AppRegistry, Button, Alert, Image, Text, TextInput, View, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

import GPSButton from './components/GPSButton/GPSButton.js';
import CameraButton from './components/CameraButton/CameraButton.js';
import LocationText from './components/LocationText/LocationText.js';

const landmarkSize = 2;

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


  takePicture = async function() {

    
    
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        console.log('data ... click en foto........');

        // funcion que acorta el nobmre del archivo
        array_uri = data.uri.split("/");
        uri_nombre_corto = array_uri[array_uri.length - 1]


        gps_latitude_float = parseFloat(this.state.gps_latitude);
        gps_longitude_float = parseFloat(this.state.gps_longitude);



        const dataform = new FormData();
        dataform.append('name', uri_nombre_corto);
        dataform.append('latitud',  gps_latitude_float);
        dataform.append('longitud', gps_longitude_float);

        console.log("lat y long ... correctos .....")

        dataform.append('photo_react', {
          uri: data.uri,
          type: 'image/jpeg', // or photo.type
          name: uri_nombre_corto
        });

        //dataform.append('latitud': )
        console.log("///////// DATA FORM INICIO /////////////");
        console.log(dataform);
        

        fetch('http://fletes.ramirovaz.webfactional.com/api/v0/restphoto/', {
          method: 'post',
          body: dataform
        }).then(res => {
          console.log('------------------resultado del POST inicio');
          console.log(res);
          console.log('------------------resultado del POST fin');
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });

        

        /*
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
        */
        console.log('---------------------------------------INICIO');
        console.log(data);
        console.log('---------------------------------------FIN');

      });
    }else{
        console.log('data ... click en foto........NOOO');
        Vibration.vibrate();
    }
    }; //takepicture


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
              <Camera style={{ flex: 1 }}  ref={ref => {this.camera = ref;}}  type={this.state.type}>
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

                <TouchableOpacity
                            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                            onPress={this.takePicture.bind(this)}>
                            <Text style={styles.flipText}> FOTO </Text>
                </TouchableOpacity>


                </View>
              </Camera>
            </View>
          );


        }// else anidado



      } // else
  }//render

}//Component   



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});

export default App;
