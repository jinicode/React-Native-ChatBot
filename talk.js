import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  ToastAndroid,
  View,
  AsyncStorage,
} from 'react-native';

import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

export default class talk extends Component {
  constructor(props) {
    super(props);
    this.onSpeak = this.onSpeak.bind(this);
    this.getDialogFlow = this.getDialogFlow.bind(this);
    this.state = {
      showText: null,
      algorithms: 0,
      compgraph: 0,
      appmath: 0,
      opsystem: 0,
      comparch: 0,
    };
  }
  componentDidMount() {
    this.saver();
  }
  saver = async () => {
    AsyncStorage.getItem('architecture').then(value => {
      console.log(value);
      this.setState({comparch: JSON.parse(value)});
    });
    AsyncStorage.getItem('graphics').then(value => {
      console.log(value);
      this.setState({compgraph: JSON.parse(value)});
    });
    AsyncStorage.getItem('operating').then(value => {
      console.log(value);
      this.setState({opsystem: JSON.parse(value)});
    });
    AsyncStorage.getItem('mathematics').then(value => {
      console.log(value);
      this.setState({appmath: JSON.parse(value)});
    });
    AsyncStorage.getItem('algorithms').then(value => {
      console.log(value);
      this.setState({algorithms: JSON.parse(value)});
    });
  };
  saveData = () => {
    AsyncStorage.setItem('architecture', this.state.comparch.toString());
   
  };
  saveData1 = () => {
     AsyncStorage.setItem('graphics', this.state.compgraph.toString());
   
  };
  saveData2 = () => {
    AsyncStorage.setItem('operating', this.state.opsystem.toString());
  };
  saveData3 = () => {
    AsyncStorage.setItem('mathematics', this.state.appmath.toString());
  };
  saveData4 = () => {
  
    AsyncStorage.setItem('algorithms', this.state.algorithms.toString());
  };
  async getDialogFlow(msg) {
    const ACCESS_TOKEN = 'cb3ae09d776549449ee1eac2488f2d0e';

    try {
      const response = await fetch(
        `https://api.dialogflow.com/v1/query?v=20170712`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query: msg,
            lang: 'EN',
            sessionId: 'somerandomthing',
          }),
        },
      );
      let responseJson = await response.json();
      this.setState({
        showText: responseJson.result.fulfillment.speech,
      });

      console.log(responseJson.result.resolvedQuery);
      if (
        responseJson.result.resolvedQuery.split(' ').includes('architecture')
      ) {
        console.log('found comparch');
        this.setState({comparch: this.state.comparch + 1});
        this.saveData();
      }else
      if (
        responseJson.result.resolvedQuery.split(' ').includes('Mathematics')
      ) {
        console.log('found mathematics');
        this.setState({appmath: this.state.appmath + 1});
        this.saveData3();
      }else
      if (responseJson.result.resolvedQuery.split(' ').includes('operating')) {
        console.log('found operating');
        this.setState({opsystem: this.state.opsystem + 1});
        this.saveData2();
      }else
      if (responseJson.result.resolvedQuery.split(' ').includes('graphics')) {
        console.log('found graphics');
        this.setState({compgraph: this.state.compgraph + 1});
        this.saveData1();
      }else
      if (responseJson.result.resolvedQuery.split(' ').includes('algorithms')) {
        console.log('found algorithms');
        this.setState({algorithms: this.state.algorithms + 1});
        this.saveData4();
      }
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async onSpeak() {
    try {
      const spokenText = await SpeechAndroid.startSpeech(
        'talk to Jarvis',
        SpeechAndroid.ENGLISH,
      );

      const dialogflowResponse = await this.getDialogFlow(spokenText);
      if (this.state.showText) {
        Tts.speak(dialogflowResponse.result.fulfillment.speech);
        ToastAndroid.show(
          dialogflowResponse.result.fulfillment.speech,
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      switch (error) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show('Voice Recognizer cancelled', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show('No match for what you said', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show('Google Server Error', ToastAndroid.LONG);
          break;
      }
    }
  }

  render() {
    return (
      <View style={{backgroundColor: '#ba92e0'}}>
        <Button
          style={styles.container}
          onPress={this.onSpeak}
          title="Press to talk"
          color="#37B6DF"
          accessibilityLabel="Press to talk"
        />
        <View
          style={{
            flexDirection: 'row',
            paddingEnd: 20,
            paddingLeft: 10,
            paddingTop: 10,
            marginTop: 10,
            backgroundColor: '#e88e84',
           
          }}>
          <Text style={{flex: 1, fontSize: 20}}>Computer Architecture</Text>
          <Text style={{fontSize: 30}}>{this.state.comparch}</Text>
        </View>
        <Text></Text>
        <View
          style={{
            flexDirection: 'row',
            paddingEnd: 20,
            paddingLeft: 10,
            paddingTop: 10,
            marginTop: 10,
            backgroundColor: '#e8b684',
          }}>
          <Text style={{flex: 1, fontSize: 20}}>Computer Graphics</Text>
          <Text style={{fontSize: 30}}>{this.state.compgraph}</Text>
        </View>
        <Text></Text>
        <View
          style={{
            flexDirection: 'row',
            paddingEnd: 20,
            paddingLeft: 10,
            paddingTop: 10,
            marginTop: 10,
            backgroundColor: '#e8e684',
          }}>
          <Text style={{flex: 1, fontSize: 20}}>Algorithms</Text>
          <Text style={{fontSize: 30}}>{this.state.algorithms}</Text>
        </View>
        <Text></Text>
        <View
          style={{
            flexDirection: 'row',
            paddingEnd: 20,
            paddingLeft: 10,
            paddingTop: 10,
            marginTop: 10,
            backgroundColor: '#b8e884',
          }}>
          <Text style={{flex: 1, fontSize: 20}}>Applied Mathematics</Text>
          <Text style={{fontSize: 30}}>{this.state.appmath}</Text>
        </View>
        <Text></Text>
        <View
          style={{
            flexDirection: 'row',
            paddingEnd: 20,
            paddingLeft: 10,
            paddingTop: 10,
            marginTop: 10,
            backgroundColor: '#84e8cf',
          }}>
          <Text style={{flex: 1, fontSize: 20}}>Operating Systems</Text>
          <Text style={{fontSize: 30}}>{this.state.opsystem}</Text>
        </View>
        <Text></Text>
        <Button title="Clear" onPress={()=>{
          AsyncStorage.clear()
        }} style={{paddingTop:40,marginTop:40,backgroundColor:"#956dd1"}}></Button>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 5,
  },
  inputtext: {
    backgroundColor: '#F5FCFF',

    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
});
