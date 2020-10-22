import React, {PureComponent} from 'react';
import {Text, View, Button, StyleSheet, ImageBackground} from 'react-native';
import chat from './chat';
import talk from './talk';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
export default class App extends PureComponent {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageBackground
        source={require('./w640.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Button
            title="Talk To J.A.R.V.I.S"
            onPress={() => {
              this.props.navigation.navigate('talk');
            }}></Button>
          <Text></Text>
          <Button
            title="Chat with J.A.R.V.I.S"
            onPress={() => {
              this.props.navigation.navigate('chat');
            }}></Button>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 20,
  },
});
