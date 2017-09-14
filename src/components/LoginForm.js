import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {

    state = { email: '', password: '', error: '', loading: false };


    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ loading: true, error: '' });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ loading: false });
            console.log('login successful'); 
        })
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ loading: false });
                console.log('user created'); 
            })
            .catch((error) => {
                this.setState({ loading: false });
                this.setState({ error: error.message }); 
            });
        });
    }

    renderButton() {
        if (this.state.loading) {
            return (<Spinner />);
        }

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
      padding: 5,
      margin: 5
    }
  };

export default LoginForm;
