import React from "react";

import {Text, View} from "react-native";

import {Card, CardItem, Item, Label, Input} from "native-base";

export default class Step2 extends React.Component {
  render(){
    return (
      <View className="step2">
        <Card>
          <CardItem>
            <Input />
          </CardItem>
          <CardItem>
            <Text>
              Please enter the 4 digit phone verification code that was just texted to you.
            </Text>
          </CardItem>
        </Card>
      </View>
    )
  }
}
