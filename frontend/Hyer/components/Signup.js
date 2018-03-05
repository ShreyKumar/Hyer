import React from "react";
import { Text, TextInput } from "react-native";
import { Container, Title, Content, Form, Item, Label, Input, Button } from "native-base";

export default class Signup extends React.Component {
  render() {
    return (
      <Container className="signup-container">
        <Title>Signup</Title>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Firstname</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Lastname</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <TextInput secureTextEntry={true} maxLength={3} />
            </Item>
            <Button><Text>Sign up</Text></Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
