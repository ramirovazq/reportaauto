import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';


export default class ButtonBasics extends Component {

  constructor(props){
    super(props);
    this.state = {
        term: "",
    }
    this.handlePress = this.handlePress.bind(this);
  }//constructor

  handlePress(event){
        console.log('se esta oprimiendo el boton ..............');
        this.props.getPosition();
        event.preventDefault();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.handlePress}
            title="Envia Posicion"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
