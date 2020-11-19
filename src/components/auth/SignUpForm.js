import React, { Component } from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import PhoneInput from 'react-phone-number-input'
import phoneInputStyle from '../../assets/css/phone-number-input.css'
import Axios from 'axios';

class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.signUpSuccessful = this.props.signUpSuccessful
        this.signUpErrorHandler = this.props.signUpErrorHandler
        this.signUpUser = this.signUpUser.bind(this)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirm: '',
            phone_number: '',
        }
    }

    signUpUser(event) {
        //preventDefault prevents form submission from opening a new page
        event.preventDefault()

        let firstName = this.state.first_name
        let lastName = this.state.last_name
        let email = this.state.email
        let password = this.state.password
        let passwordConfirm = this.state.password_confirm
        let phoneNumber = this.state.phone_number

        validateNames(firstName, lastName)
        validateEmail(email)
        validatePasswords(password, passwordConfirm)
        validatePhoneNumber(phoneNumber)

        if (password != passwordConfirm) {
            const err = { message: "Sorry, the passwords didn't match"}
            this.signUpErrorHandler(err, {})
            return
        }

        Axios.post("https://errand-backend.herokuapp.com:443/api/auth/signup", {first_name: firstName, last_name: lastName, email: email, password: password, phone_number: phoneNumber}, {timeout: 5000})
        .then(res => {
            console.log("Sign Up successful")
            const token = res.data.token
            this.signUpSuccessful(token)
        })
        .catch(err => {
            console.log("Error" + err)
            console.log("Error Response:" + JSON.stringify(err.response))
            this.signUpErrorHandler(err, err.response.data)
      })
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    value = {this.state.first_name}
                    onChangeText = {(newValue) => this.setState((state => ({
                        first_name: newValue
                    })))}
                    placeholder="First Name"
                    style= {styles.textInput}
                />
                <TextInput
                    value = {this.state.last_name}
                    onChangeText = {(newValue) => this.setState((state => ({
                        last_name: newValue
                    })))}
                    placeholder="Last Name"
                    style= {styles.textInput}
                />
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
                    onChangeText = {(newValue) => this.setState((state => ({
                        password: newValue
                    })))}
                    placeholder="Password"
                    secureTextEntry
                    style= {styles.textInput}
                />
                <TextInput
                    value = {this.state.password_confirm}
                    onChangeText = {(newValue) => this.setState((state => ({
                        password_confirm: newValue
                    })))}
                    placeholder="Confirm Password"
                    secureTextEntry
                    style= {styles.textInput}
                />
                <PhoneInput 
                    value = {this.state.phone_number}
                    onChange= {(newValue) => this.setState((state => ({
                        phone_number: newValue
                    })))}
                    placeholder="Phone number"
                    countries={["CA", "US"]}
                    defaultCountry="CA"
                    style={phoneInputStyle}
                />
                <Button
                    onPress={this.signUpUser}
                    title="Sign Up"
                />
            </View>
        )
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
      textAlign: 'center',
      borderWidth: 'thin',
      backgroundColor: "#E8F0FE",
    }
  });


export default SignUpForm