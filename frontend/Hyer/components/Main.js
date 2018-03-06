import React from "react";
import ReactNative from "react-native";
const {
  Component,
  View
} = ReactNative

import Login from "./Login.js";
import Signup from "./Signup.js";

import { Header, Container, Title, Body } from "native-base"
import NavigationBar from "react-native-navbar";


export default class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      view: "login"
    }
  }

  render() {
    const titleConfig = {
      title: "Welcome to Hyer!"
    }

    const rightButtonConfig = {
      title: "Login",
      handler: () => this.setState({view: "login"})
    }
    const leftButtonConfig = {
      title: "Sign up",
      handler: () => this.setState({view: "signup"})
    }

    var ret;

    if(this.state.view == "login"){
      ret = (<Login />)
    } else {
      ret = (<Signup />)
    }

    return (
      <Container className="main-container">
        <NavigationBar
            title={titleConfig}
            rightButton={rightButtonConfig}
            leftButton={leftButtonConfig}
        />
        {ret}
      </Container>
    )
  }
}
