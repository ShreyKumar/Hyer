import React from "react";
import {View, Text} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class Profile extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Container className="profile">
        <Content>
          <Card>
            <CardItem header>
              <Text>Firstname</Text>
            </CardItem>

            <CardItem>
              <Text>Shrey</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Lastname</Text>
            </CardItem>

            <CardItem>
              <Text>Kumar</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Age</Text>
            </CardItem>

            <CardItem>
              <Text>21</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Bio</Text>
            </CardItem>

            <CardItem>
              <Text>U of T student</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
