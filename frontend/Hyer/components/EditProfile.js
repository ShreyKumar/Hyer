import React from "react";
import {View, Text, TextInput} from "react-native";
import {Container, Content, Form, Item, Label, Input, Button, Card, CardItem} from "native-base";

export default class EditProfile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      bio: ""
    }

    //get request to prefill profile
    var prefix = "https://hyer.herokuapp.com";
    fetch(prefix + "/users?username=" + this.props.id).then((resp) => {
      resp.json().then((data) => {
        alert("loaded!");
        console.log(data);
      })
    }).catch((error) => {
      alert("Error loading profile!");
      console.error(error);
    })

  }

  update = () => {
    var prefix = "https://hyer.herokuapp.com";

    var toSend = {
      password: "",
      phoneNumber: "",
      photo: ""
    }

    if(this.state.username != ""){
      toSend.username = this.state.username;
    }

    if(this.state.password != ""){
      toSend.password = this.state.password;
    }

    if(this.state.firstname != ""){
      toSend.firstName = this.state.firstname;
    }

    if(this.state.lastname != ""){
      toSend.lastName = this.state.lastname;
    }

    if(this.state.bio != ""){
      toSend.bio = this.state.bio
    }

    if(this.state.email != ""){
      toSend.email = this.state.email
    }

    fetch(prefix + "/put/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    })
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
          <Button block style={{marginTop: 30}} onPress={() => this.update()}>
            <Text>Update</Text>
          </Button>
        </Form>
      </Content>
      </Container>
    )
  }

}
