import React from "react";
import {View, Text, Button} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class Profile extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      bio: ""
    }

    var prefix = "https://hyer.herokuapp.com"
    fetch(prefix + "/users?username=" + this.props.id).then((res) => {
      res.json().then((data) => {
        this.setState({
          username: this.props.id,
          firstname: data[0][this.props.id]["firstName"],
          lastname: data[0][this.props.id]["lastName"],
          email: data[0][this.props.id]["email"],
          bio: data[0][this.props.id]["bio"],
          credits: data[0][this.props.id]["credits"]
        })
      })
    }).catch((err) => {
      console.error(err);
    })

  }
  render() {
    return (
      <Container className="profile">
        <Content>
          <Card>
            <CardItem header>
              <Text>Username</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.username}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Firstname</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.firstname}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Lastname</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.lastname}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Email</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.email}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Bio</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.bio}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Total Credits</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.credits}</Text>
            </CardItem>
          </Card>

          <Button onPress={() => this.props.changeView("editprofile")} title="Edit Profile" />
        </Content>
      </Container>
    )
  }
}
