import React, { Component } from 'react';
import SignUpForm from '../../components/auth/SignUpForm'

class SignUpScreen extends Component {
    constructor(props) {
        super(props)
        this.navigation = this.props.navigation
    }

    render() {
        return(
            <SignUpForm/>
        )
    }
}

export default SignUpScreen