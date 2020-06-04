import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import Axios from 'axios';

class LogInForm extends Component {
  constructor(props) {
    super(props)
    this.authorizeLogin = this.props.authorizeLogin
    this.handleLogIn = this.handleLogIn.bind(this)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleLogIn(event) {
    event.preventDefault()

    const email = this.state.email
    const password = this.state.password

    Axios.post("https://errand-backend.herokuapp.com:443/api/auth/signin", {email: email, password: password}, {timeout: 5000})
      .then(res => {
        console.log("Log In successful")
        const token = res.data.token
        this.authorizeLogin(token)
      })
      .catch(error => {
        console.log("Nope" + error)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value = {this.state.email}
          onChangeText = {(newValue) => this.setState((state => ({
            email: newValue
          })))}
          placeholder="Email"
        />
        <TextInput
          value = {this.state.password}
          onChangeText = {(newValue) => this.setState(state => ({
            password: newValue
          }))}
          secureTextEntry
          placeholder="Password"
        />

        <Button
          onPress={this.handleLogIn}
          title="Log In"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  }
});

export default LogInForm;
