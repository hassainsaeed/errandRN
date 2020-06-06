import React, { Component } from 'react';
import SignUpForm from '../../components/auth/SignUpForm'
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { showMessage } from "react-native-flash-message";

class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation
        this.signUpSuccessful = this.signUpSuccessful.bind(this)
        this.signUpErrorHandler = this.signUpErrorHandler.bind(this)
        this.state = {
            error: false,
            error_message: "",
        }
    }

    signUpSuccessful(token) {
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

    signUpErrorHandler(err, errResponse) {
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
          description: "Please try again",
          type: "danger",
        });        
    }


    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.title} > Create your Errand Account </Text>
                <SignUpForm signUpSuccessful={this.signUpSuccessful} signUpErrorHandler = {this.signUpErrorHandler} />
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

export default SignUpScreen