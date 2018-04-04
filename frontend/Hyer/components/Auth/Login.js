import React from 'react';
import { TextInput } from "react-native";
import { Container, Title, Form, Item, Input, Content, Button, Text, Label } from "native-base";

//use emojis to censor password
import Emoji from "react-native-emoji";

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  validate = () => {
    if(this.state.username.length > 0 && this.state.password.length > 0){

      var prefix = "https://hyer.herokuapp.com"
      fetch(prefix + "/users?username=" + this.state.username).then((res) => {
        res.json().then((data) => {
          if(data.password == this.state.password){
            alert("Logged in!");
            this.props.updateMain(this.state.username);
          }
        })
      }).catch((err) => {
        console.error(err);
      })
    } else {
      alert("Some fields are missing!")
    }
  }


  render() {
    return (
      <Container className="login-container">
        <Title>Login</Title>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(text) => this.setState({username: text})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(text) => this.setState({password: text})} secureTextEntry/>
            </Item>
            <Button block style={{marginTop: 30}} onPress={this.validate.bind(this)}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
