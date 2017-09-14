import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Spinner, Button, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';
import firebase from 'firebase';

class App extends Component {

state = { user: null, isLogged: null };


componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyAHSRjQyRdffDRE3b4NED7IdyrqgYiGAbA',
        authDomain: 'max-test-1184b.firebaseapp.com',
        databaseURL: 'https://max-test-1184b.firebaseio.com',
        projectId: 'max-test-1184b',
        storageBucket: '',
        messagingSenderId: '775812129677'
    });

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);

        this.setState({ user: user, isLogged: (user !== null) });
    });
}

renderPage() {
    console.log(this.state.user);

    if (this.state.isLogged === true) {
        return (
            <Card>
                <CardSection>
                    <Text>Welcome {this.state.user.email}</Text>
                    <Button onPress={() => {firebase.auth().signOut()}}>Log Out</Button>
                </CardSection>
            </Card>
        );
    } else if (this.state.isLogged === false) {
        return <LoginForm />;
    }

    return <Spinner />;
}

render() {
    return (
       <View>
           <Header>Authentication</Header>
           { this.renderPage() }
       </View>
    );
  }
}

export default App;
