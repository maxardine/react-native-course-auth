import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';
import firebase from 'firebase';

class App extends Component {

componentWillMount(){
    firebase.initializeApp({
        apiKey: "AIzaSyAHSRjQyRdffDRE3b4NED7IdyrqgYiGAbA",
        authDomain: "max-test-1184b.firebaseapp.com",
        databaseURL: "https://max-test-1184b.firebaseio.com",
        projectId: "max-test-1184b",
        storageBucket: "",
        messagingSenderId: "775812129677"
    });
}

render() {
    return (
       <View>
           <Header>Authentication</Header>
           <LoginForm />
       </View>
    );
  }
}

export default App;
