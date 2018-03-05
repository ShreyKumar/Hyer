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

  render() {
    const titleConfig = {
      title: "Welcome to Hyer!"
    }

    const rightButtonConfig = {
      title: "Login",
      handler: () => alert("Show Login")
    }
    const leftButtonConfig = {
      title: "Sign up",
      handler: () => alert("Show signup")
    }

    return (
      <Container className="main-container">
        <NavigationBar
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
        />
        <Login />
        <Signup />
      </Container>
    )
  }
}
