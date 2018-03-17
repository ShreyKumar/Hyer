import React from "react";
import {View, Text} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class Jobs extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container>
        <Content>
          <Text>Jobs</Text>
        </Content>
      </Container>
    );
  }

}
