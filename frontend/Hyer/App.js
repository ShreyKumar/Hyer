import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Container, Header, Title, Content} from "native-base";

//components
import Login from "./components/Auth/Login.js";
import Signup from "./components/Auth/Signup.js";
import Profile from "./components/Profile.js";
import PhoneVerification from "./components/PhoneVerification.js";
import Jobs from "./components/Jobs.js";

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "view": "login"
    }
    this.navbar = null
  }

  success = () => {
    //do evaluation and redirect to appropriate function
    alert("success")
    this.setState({"view": "phoneverification"})
  }


  render() {
    if(this.state.view == "login" || this.state.view == "signup"){
      this.navbar = (
        <View>
          <Button onPress={() => this.setState({"view": "signup"})} style={{marginBottom: 50}} title="Signup" />
          <Button onPress={() => this.setState({"view": "login"})} title="Login" />
          <Button onPress={() => this.setState({"view": "profile"})} title="Profile" />
          <Button onPress={() => this.setState({"view": "jobs"})} title="Jobs" />
        </View>
      )
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Title>Hyer</Title>
        </Header>

        <Content>
          {this.navbar}
          {(this.state.view == "login") ? <Login updateMain={this.success.bind(this)}/>: null}
          {(this.state.view == "signup") ? <Signup updateMain={this.success.bind(this)}/>: null}
          {(this.state.view == "profile") ? <Profile /> : null}
          {(this.state.view == "phoneverification") ? <PhoneVerification /> : null}
          {(this.state.view == "jobs") ? <Jobs /> : null}

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
