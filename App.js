// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import {Dialogflow_V2} from 'react-native-dialogflow';
// import {dialogflowConfig} from './env'
// const BOT_USER = {
//   _id: 2,
//   name: 'FAQ Bot',
//   avatar: 'https://i.imgur.com/7k12EPD.png'
// };
// class App extends Component {
//   state = {
//     messages: [
//       {
//         _id: 1,
//         text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
//         createdAt: new Date(),
//         user:BOT_USER
//       }
//     ]
//   };
//   componentDidMount() {
//     Dialogflow_V2.setConfiguration(
//       dialogflowConfig.client_email,
//       dialogflowConfig.private_key,
//       Dialogflow_V2.LANG_ENGLISH_US,
//       dialogflowConfig.project_id
//     );
//   }
//   onSend(messages = []) {
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages)
//     }));

//     let message = messages[0].text;
//     Dialogflow_V2.requestQuery(
//       message,
//       result => this.handleGoogleResponse(result),
//       error => console.log(error)
//     );
//   }
//   handleGoogleResponse(result) {
//     let text = result.queryResult.fulfillmentMessages[0].text.text[0];
//     this.sendBotResponse(text);
// }

// sendBotResponse(text) {
//     let msg = {
//       _id: this.state.messages.length + 1,
//       text,
//       createdAt: new Date(),
//       user: BOT_USER
//     };

//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, [msg])
//     }));
//   }
//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: '#fff' }}>
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={messages => this.onSend(messages)}
//           user={{
//             _id: 1
//           }}
//         />
//       </View>
//     );
//   }
// }

// export default App;
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   Button,
//   ToastAndroid,
//   View
// } from 'react-native';

// import SpeechAndroid from 'react-native-android-voice';
// import Tts from 'react-native-tts';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.onSpeak = this.onSpeak.bind(this);
//     this.getDialogFlow = this.getDialogFlow.bind(this);
//     this.state = { showText: null };
//   }

//   async getDialogFlow(msg) {
//     const ACCESS_TOKEN = 'cb3ae09d776549449ee1eac2488f2d0e';

//     try {
//        const response = await fetch(`https://api.dialogflow.com/v1/query?v=20170712`, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json; charset=utf-8',
//           'Authorization': `Bearer ${ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify({
//           query: msg,
//           lang: 'EN',
//           sessionId: 'somerandomthing'
//         })
//       })
//       let responseJson = await response.json();
//       this.setState({
//         showText: responseJson.result.fulfillment.speech,
//       });
//       return responseJson;
//     } catch(error) {
//       console.error(error);
//     }
//   }

//   async onSpeak() {
//     try {
//       const spokenText = await SpeechAndroid.startSpeech("talk to Jarvis", SpeechAndroid.ENGLISH);

//       const dialogflowResponse = await this.getDialogFlow(spokenText);
//       if (this.state.showText) {
//         Tts.speak(dialogflowResponse.result.fulfillment.speech);
//         ToastAndroid.show(dialogflowResponse.result.fulfillment.speech, ToastAndroid.LONG);
//       }
//     } catch(error) {
//       switch(error){
//         case SpeechAndroid.E_VOICE_CANCELLED:
//           ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
//           break;
//         case SpeechAndroid.E_NO_MATCH:
//           ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
//           break;
//         case SpeechAndroid.E_SERVER_ERROR:
//           ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
//           break;
//       }
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>

//       <Button
//         onPress={this.onSpeak}
//         title="Press to talk"
//         color="#37B6DF"
//         accessibilityLabel="Press to talk"
//       />

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });
import React, {PureComponent} from 'react';
import {Text, View, Button, StyleSheet, ImageBackground} from 'react-native';
import chat from './chat';
import talk from './talk';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firstscreen from './firstscreen';
//import imetable from './Timetable'
const MainNavigator = createStackNavigator(
  {
    chat: {screen: chat},
    talk: {screen: talk},
    firstscreen: {screen: firstscreen},
    //timetable:{screen:timetable}
  },
  {
    initialRouteName: 'firstscreen',
    defaultNavigationOptions: {
      title: 'STARK',
    },
  },
);

const App = createAppContainer(MainNavigator);

export default () => {
  return <App />;
};
