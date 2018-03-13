import React from 'react';
import { TextInput } from "react-native";
import { Container, Title, Form, Item, Input, Content, Button, Text, Label } from "native-base";

//use emojis to censor password
import Emoji from "react-native-emoji";

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
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
              <Input onChangeText={() => this.setState({"email": this.value})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button block style={{marginTop: 30}} onPress={() => this.props.updateMain()}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
