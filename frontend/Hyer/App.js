import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Container, Header, Title, Content} from "native-base";

//components
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "view": "login"
    }

  }

  changeToSignup = () => {
    alert("sign up");
    //this.setState({login: false})
  }

  changeToLogin = () => {
    alert("login");

    //this.setState({login: true})
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Title>Hyer</Title>
        </Header>

        <Content>
          <Button onPress={() => this.setState({"view": "signup"})} style={{marginBottom: 50}} title="Click Signup" />
          <Button onPress={() => this.setState({"view": "login"})} title="Click Login" />

          {(this.state.view == "login") ? <Login />: <Signup />}
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    paddingTop: 27
  }
});
