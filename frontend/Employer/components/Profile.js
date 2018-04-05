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
        bio: "",
        credits: 0
      }

      var prefix = "https://hyer.herokuapp.com"
      fetch(prefix + "/users?username=" + this.props.username).then((res) => {
        res.json().then((data) => {
          this.setState({
            username: this.props.username,
            firstname: data[0][this.props.username]["firstName"],
            lastname: data[0][this.props.username]["lastName"],
            email: data[0][this.props.username]["email"],
            bio: data[0][this.props.username]["bio"],
            credits: data[0][this.props.username]["credits"]
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
              <Text>Name</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.lastname}, {this.state.firstname}</Text>
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

           <Button block onPress={() => this.props.changeView("editprofile")} title="Edit Profile" />
        </Content>
      </Container>
    )
  }
}
