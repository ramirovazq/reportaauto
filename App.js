import React, { Component } from 'react';
import { AppRegistry, Button, Alert, Image, Text, TextInput, View, StyleSheet } from 'react-native';


class Greeting extends Component {
    render() {
        return (
            <Text style={styles.red}>Holaa {this.props.name}!</Text>
        );
    }
}



class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {isShowingText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }//constructor

  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}


const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

/*
export default class HelloWorldApp extends Component {
    render() {

        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };

        return (
             <View style={{alignItems: 'center', flex: 1, flexDirection: 'row'}}>                
                <Image source={pic} style={{width: 193, height: 110}}/>

                <View style={{flex: 1, backgroundColor: 'powderblue'}} >
                    <Greeting name='Rexxar' />
                    <Greeting name='Jaina' />
                    <Greeting name='Valeera' />
                 </View>

                <View style={{flex: 2, backgroundColor: 'powderblue'}} >
                    <Blink text='Texto que aparece y desaparece' />
                    <Blink text='Texto otro mas' />
                    <Text style={styles.red}>just red</Text>
                    <Text style={styles.bigblue}>just bigblue</Text>
                    <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
                    <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
                 </View>

                <View style={{flex: 3, backgroundColor: 'steelblue'}} >
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
                    <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
                 </View>

             </View>
        );
    }
}

*/

/*

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{paddingTop: 80}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join('xxx')}
        </Text>


        <Button
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          title="Press Me"
        />

      </View>
    );
  }
}

*/



export default class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}
