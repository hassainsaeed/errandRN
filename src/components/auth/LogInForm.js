import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import Axios from 'axios';

class LogInForm extends Component {
  constructor(props) {
    super(props)
    this.logInAuthorized = this.props.logInAuthorized
    this.logInErrorHandler = this.props.logInErrorHandler
    this.initiateLogIn = this.initiateLogIn.bind(this)
    this.state = {
      email: '',
      password: ''
    }
  }

  initiateLogIn(event) {
    //preventDefault prevents form submission from opening a new page
    event.preventDefault()

    const email = this.state.email
    const password = this.state.password

    Axios.post("https://errand-backend.herokuapp.com:443/api/auth/signin", {email: email, password: password}, {timeout: 5000})
      .then(res => {
        console.log("Log In successful")
        const token = res.data.token
        this.logInAuthorized(token)
      })
      .catch(err => {
        console.log("Error" + err)
        console.log("Error Response:" + JSON.stringify(err.response))
        this.logInErrorHandler(err, err.response.data)
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
          style= {styles.textInput}
        />
        <TextInput
          value = {this.state.password}
          onChangeText = {(newValue) => this.setState(state => ({
            password: newValue
          }))}
          secureTextEntry
          placeholder="Password"
          style= {styles.textInput}
        />
        <Button
          onPress={this.initiateLogIn}
          title="Log In"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    margin: 15,
    padding: 15,
    borderWidth: 'thin',
  },
});

export default LogInForm;
