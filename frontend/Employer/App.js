import React from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native';
import {Container, Header, Title, Content} from "native-base";

//components
import Login from "./components/Auth/Login.js";
import Signup from "./components/Auth/Signup.js";
import Profile from "./components/Profile.js";
import PhoneVerification from "./components/PhoneVerification.js";
import Jobs from "./components/Job/JobHome.js";

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      view: "login",
      username: "", //TODO should be set when logged in
      user: {
        name: {firstName: "", lastName: ""},
        email: "",
        bio: "",
        password: ""
      }
    }
    this.navbar = null
    var url = "https://hyer.herokuapp.com/users"
  }

  success = (usr, userinfo) => {
    //do evaluation and redirect to appropriate function
    this.setState({username: usr, user: userinfo, view: "profile"})

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
          <Title>Employer</Title>
        </Header>

        <Content>
          {this.navbar}
          {(this.state.view == "login") ? <Login updateMain={this.success.bind(this)}/>: null}
          {(this.state.view == "signup") ? <Signup updateMain={this.success.bind(this)}/>: null}
          {(this.state.view == "profile") ? <Profile username={this.state.username} user={this.state.user}/> : null}
          {(this.state.view == "phoneverification") ? <PhoneVerification /> : null}
          {(this.state.view == "jobs") ? <Jobs username={this.state.username}/> : null}
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
