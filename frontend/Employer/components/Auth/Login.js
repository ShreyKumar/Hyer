import React from 'react';
import { TextInput } from "react-native";
import { Container, Title, Form, Item, Input, Content, Button, Text, Label } from "native-base";

//use emojis to censor password
//import Emoji from "react-native-emoji";

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      validated: false,
      logged: null,
      email: "",
      password: ""
    }
  }

  validate = () => {
    this.setState({logged: false})
    if(this.state.validated){
      //check with backend here
      console.log("Input Email: ", this.state.email);
      console.log("Input Pwd: ", this.state.password)

      //if user is found, log user in and send him to phone verification if
      fetch("https://hyer.herokuapp.com/users", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        response.json().then((users) => {
            Object.keys(users).map((user) => {
                if (users[user].email == this.state.email){
                    console.log("Email Found: ", users[user].email)
                    if (users[user].password == this.state.password){
                        console.log("Password Match: ", users[user].password)
                        this.props.updateMain(user, users[user])
                        this.setState({logged: true})
                        return
                    }
                }
            })
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  validateEmail = (email) => {
    this.setState({
      "email": email
    })

    if(email.length == 0){
      this.setState({"validated": false})
    } else {
      this.setState({"validated": true})
    }
  }

  validatePassword = (pwd) => {
    this.setState({
      "password": pwd
    })

    if(pwd.length == 0){
      this.setState({"validated": false})
    } else {
      this.setState({"validated": true})
    }
  }


  render() {
    return (
      <Container className="login-container">
        <Title>Login</Title>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.props.email} onChangeText={this.validateEmail.bind(this)}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input value={this.props.password} onChangeText={this.validatePassword.bind(this)}/>
            </Item>
            <Button block style={{marginTop: 30}} onPress={this.validate.bind(this)}>
              <Text>Login</Text>
            </Button>
          </Form>
          {(!this.state.validated) ? <Text>Please make sure you haven't left any field blank!</Text> : null}
        </Content>
      </Container>
    )
  }
}