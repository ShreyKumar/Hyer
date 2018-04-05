import React from 'react';
import { TextInput } from "react-native";
import { Container, Form, Item, Input, Content, Button, Text, Label } from "native-base";

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  validate = () => {
    this.setState({logged: false})
      //check with backend here
      console.log("Username: ", this.state.username);
      console.log("Password: ", this.state.password);
      if(this.state.username.length == 0 || this.state.password.length == 0){
        alert("Missing Field!")
        return
      }

      //if user is found, log user in and send him to phone verification if
      fetch("https://hyer.herokuapp.com/users?username=" + this.state.username, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        response.json().then((data) => {
                  if(data.length == 0){
                    alert("User not found!")
                  } else if(data[0][this.state.username]["password"] != this.state.password){
                    alert("Incorrect password")
                  } else {
                    this.props.updateMain(this.state.username)
                  }
                })
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <Container className="login-container">
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