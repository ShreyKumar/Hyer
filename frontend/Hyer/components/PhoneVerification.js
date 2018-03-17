import React from "react";
import {Text} from "react-native";
import {Container, Content, Card, CardItem, Form, Input, Item, Label} from "native-base";

export default class PhoneVerification extends React.Component {
  constructor(props){
    super(props);

    this.hint = null
  }

  showMsg = () => {
    this.hint = (
      <CardItem>
        <Text>Test</Text>
      </CardItem>
    )
    alert("pressed")
  }

  render(){
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Text>Please verify your phone below</Text>
            </CardItem>
            <CardItem>
              <Item floatingLabel>
                <Label>Phone number</Label>
                <Input onPress={() => this.showMsg()}/>
              </Item>
            </CardItem>
            {this.hint}
          </Card>
        </Content>
      </Container>
    )
  }
}
