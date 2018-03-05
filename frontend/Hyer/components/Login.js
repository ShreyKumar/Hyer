import React from 'react';
import { Container, Title, Form, Item, Input, Content, Button, Text, Label } from "native-base";

export default class Login extends React.Component {
  render() {
    return (
      <Container className="login-container">
        <Title>Login</Title>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button primary>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
