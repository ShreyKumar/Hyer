import React from "react";
import {View, Text, TextInput} from "react-native";
import {Container, Content, Form, Item, Label, Input, Button, Card, CardItem} from "native-base";

export default class EditProfile extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Container className="edit-profile">
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
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
          <Card style={{
            marginTop: 30
          }}>
            <CardItem>
              <TextInput style={{
                width: "100%",
                fontSize: 19
              }}
              multiline={true}
              numberOfLines={6}
              maxLength={300}
              placeholder="Bio"
              allowFontScaling />
            </CardItem>
          </Card>
          <Button block style={{marginTop: 30}}>
            <Text>Update</Text>
          </Button>
        </Form>
      </Content>
      </Container>
    )
  }

}
