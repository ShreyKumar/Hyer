import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Container, Header, Title, Content} from "native-base";

//components
import Login from "./components/Auth/Login.js";
import Signup from "./components/Auth/Signup.js";
import Profile from "./components/Profile.js";
import EditProfile from "./components/EditProfile.js";
import PhoneVerification from "./components/PhoneVerification.js";
import Jobs from "./components/Jobs.js";
import JobInfo from "./components/JobInfo.js";

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "view": "login",
      "thisjobid": "",
      "thisuser": ""
    }
    this.navbar = null
  }

  success = (username) => {
    //do evaluation and redirect to appropriate function
    this.setState({"thisuser": username})
    this.setState({"view": "profile"})
    console.log("this user");
    console.log(this.state.thisuser);
  }

  changeToJobInfo = (id) => {
    this.setState({
      "view": "jobinfo",
      "thisjobid": id
    })
    console.log(this.component);
  }

  changeView = (view) => {
    if(view == "editprofile"){
      this.setState({"view": "editprofile"})
    } else if(view == "profile"){
      this.setState({"view": "profile"})
    }
  }


  render() {
    if(this.state.view == "login" || this.state.view == "signup"){
      this.navbar = (
        <View>
          {(this.state.thisuser != "") ? <Button onPress={() => this.setState({"view": "signup"})} style={{marginBottom: 50}} title="Signup" /> : null }
          {(this.state.thisuser != "") ? <Button onPress={() => this.setState({"view": "login"})} title="Login" /> : null}
          {(this.state.thisuser != "") ? <Button onPress={() => this.setState({"view": "profile"})} title="Profile" /> : null}
          {(this.state.thisuser != "") ? <Button onPress={() => this.setState({"view": "login", "thisuser": ""})} title="Log out" /> : null}
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
          {(this.state.view == "login") ? <Login changeView={this.changeView.bind(this)} updateMain={this.success.bind(this)}/>: null}
          {(this.state.view == "signup") ? <Signup changeView={this.changeView.bind(this)} updateMain={this.success.bind(this)}/>: null}
          {(this.state.view == "profile") ? <Profile changeView={this.changeView.bind(this)} id={this.state.thisuser} /> : null}
          {(this.state.view == "editprofile") ? <EditProfile changeView={this.changeView.bind(this)} id={this.state.thisuser} /> : null}
          {(this.state.view == "phoneverification") ? <PhoneVerification /> : null}
          {(this.state.view == "jobs") ? <Jobs changeView={this.changeView.bind(this)} updateMain={this.changeToJobInfo.bind(this)} /> : null}
          {(this.state.view == "jobinfo") ? <JobInfo changeView={this.changeView.bind(this)} id={this.state.thisjobid} /> : null}

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
