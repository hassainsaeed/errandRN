import React, { Component } from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableHighlight} from 'react-native';
import LogInForm from '../../components/auth/LogInForm'
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation
        this.logInAuthorized = this.logInAuthorized.bind(this)
        this.logInErrorHandler = this.logInErrorHandler.bind(this)
        this.state = {
          error: false,
          error_message: "",
        }
    }

    logInAuthorized(token) {
      const storeData = async (token) => {
        try {
          const jsonValue = JSON.stringify(token)
          await AsyncStorage.setItem('@jsonwebtoken', jsonValue)
          console.log("Saving Token")
        } catch (e) {
          // saving error
          console.log("Error saving token: " + error)
        }
      }
      this.navigation.navigate('App')
    }

    logInErrorHandler(err, errResponse) { 
      let errorMessage = err.message
      if ("errors" in errResponse && "message" in errResponse.errors) {
        errorMessage = errResponse.errors.message 
      } 
      this.setState({
        error: true,
        error_message: errorMessage,
      });
      showMessage({
        message: errorMessage,
        description: "Please try again, or sign up today if you do not have an account",
        type: "danger",
      });
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
              <Text style={styles.title} > Sign In </Text>
              <LogInForm logInAuthorized = {this.logInAuthorized} logInErrorHandler = {this.logInErrorHandler}/>
              <br/>
              <TouchableHighlight onPress={() => this.navigation.navigate('SignUp')}> 
                <Text>Don't have an account? Click here to sign up </Text>
              </TouchableHighlight> 
          </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //flex: 1,
    padding: 24,
  },
  title: {
    margin: 24,
    marginTop: 50,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    margin: 24,
    marginTop: 0,
    fontSize: 18,
    textAlign: 'center',
  }
});


export default LoginScreen;


