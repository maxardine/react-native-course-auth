import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Input, Button } from './common';


class LoginForm extends Component {

    state = { email: '', password: '', error: '' };


    onButtonPress() {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => { console.log('login successful'); })
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { console.log('user created'); })
            .catch((error) => { this.setState({ error: error.message }); });
        });
    }

    renderButton() {
        return (
            <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        );
    }

    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Input 
                            label='Email'
                            placeholder='user@gmail.com'
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label='Password'
                            placeholder='password'
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </CardSection>
                    <CardSection>
                        { this.renderButton() }
                    </CardSection>
                </Card>
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
      fontSize: 16,
      alignSelf: 'center',
      color: 'red',
      padding: 10
    }
  };

export default LoginForm;
