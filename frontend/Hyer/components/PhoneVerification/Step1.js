import React from "react";

import {Text, View} from "react-native";

import {Card, CardItem, Item, Label, Input, Button} from "native-base";

export default class Step1 extends React.Component {
  render(){
    return (
      <View className="step1">
        <Card>
          <CardItem>
            <Text>Please verify your phone below</Text>
          </CardItem>
          <CardItem>
            <Item floatingLabel>
              <Label>Phone number</Label>
              <Input />
            </Item>
          </CardItem>
          <CardItem>
            <Text>
              Please make sure this is a valid phone.
              This is just so we are able to prevent any scams that may happen.
            </Text>
          </CardItem>
        </Card>
        <Button block style={{marginTop: 30}} onPress={() => this.props.updateMain()}>
          <Text>Verify</Text>
        </Button>
      </View>
    )
  }
}
