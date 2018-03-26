import React from 'react';
import { TextInput } from "react-native";
import { Container, Title, Form, Item, Input, Content, Button, Text, Label } from "native-base";

//use emojis to censor password
import Emoji from "react-native-emoji";

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      validated: false,
      email: "",
      password: ""
    }
  }

  validate = () => {
    if(this.state.validated){
      //check with backend here
      console.log("email");
      console.log(this.state.email);

      console.log("pwd");
      console.log(this.state.password)

      //if user is found, log user in and send him to phone verification if
      this.props.updateMain()

    }
  }

  validateEmail = (email) => {
    this.setState({
      "email": email
    })

    if(email.length == 0){
      alert("empty email!")
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
      alert("empty email!")
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
              <Input value={this.props.email} onChangeText={this.validateEmail.bind(this)} keyboardType="email-address"/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input value={this.props.password} onChangeText={this.validatePassword.bind(this)} secureTextEntry/>
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
