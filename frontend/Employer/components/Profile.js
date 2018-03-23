import React from "react";
import {View, Text} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class Profile extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        username : this.props.username,
        user : this.props.user
    }
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
              <Text>{this.state.user.name.lastName}, {this.state.user.name.firstName}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Email</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.user.email}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Bio</Text>
            </CardItem>

            <CardItem>
              <Text>{this.state.user.bio}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
