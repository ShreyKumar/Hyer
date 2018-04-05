import React from "react";
import {View, Text, TextInput} from "react-native";
import {Container, Content, Form, Item, Label, Input, Button, Card, CardItem} from "native-base";

export default class EditProfile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: this.props.id,
      firstname: "",
      lastname: "",
      email: "",
      bio: ""
    }

    //get request to prefill profile
    var prefix = "https://hyer.herokuapp.com";
    fetch(prefix + "/users?username=" + this.state.username).then((resp) => {
      resp.json().then((data) => {
        console.log(data);
        this.setState({
          username: this.props.id,
          firstname: data[0][this.props.id]["firstName"],
          lastname: data[0][this.props.id]["lastName"],
          email: data[0][this.props.id]["email"],
          bio: data[0][this.props.id]["bio"],
          credits: data[0][this.props.id]["credits"].toString()
        })
      })
    }).catch((error) => {
      console.error(error);
    })

  }

  update = () => {
    var prefix = "https://hyer.herokuapp.com";

    console.log("get bio");
    console.log(this.state.bio);

    var toSend = {
      username: this.state.username,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      bio: this.state.bio,
      email: this.state.email,
      password: "",
      phoneNumber: "",
      photo: "",
      credits: this.state.credits
    }
    console.log("to send");
    console.log(toSend);

    fetch(prefix + "/put/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    }).then((resp) => {
      console.log("updated profile");
      this.props.changeView("profile")
      console.log(resp);
    }).catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <Container className="edit-profile">
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input value={this.state.username} onChangeText={(text) => this.setState({username: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Firstname</Label>
            <Input value={this.state.firstname} onChangeText={(text) => this.setState({firstname: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Lastname</Label>
            <Input value={this.state.lastname} onChangeText={(text) => this.setState({lastname: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input value={this.state.email} onChangeText={(text) => this.setState({email: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Credits</Label>
            <Input value={this.state.credits} keyboardType="numeric" onChangeText={(text) => this.setState({credits: text})} />
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
              value={this.state.bio}
              onChangeText={(text) => this.setState({bio: text})}
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
