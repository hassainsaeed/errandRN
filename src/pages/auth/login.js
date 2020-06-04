import React, { Component } from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableHighlight} from 'react-native';
import LogInForm from '../../components/auth/LogInForm'
import AsyncStorage from '@react-native-community/async-storage';


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation
        this.authorizeLogin = this.authorizeLogin.bind(this)
    }

    authorizeLogin(token) {
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

    render() {
        return(
            <SafeAreaView style={styles.container}>
              <Text style={styles.title} > Sign In </Text>
              <LogInForm authorizeLogin = {this.authorizeLogin} />
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
    padding: 24,
  },
  title: {
    margin: 24,
    marginTop: 0,
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


