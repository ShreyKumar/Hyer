import React from "react";

import {Text, View} from "react-native";

import {Card, CardItem, Item, Label, Input} from "native-base";

export default class Step2 extends React.Component {
  constructor(props){
    super(props);

    //fetch actual code for this user here and set it is a state or prop

  }

  setInputCode = (code) => {
    //compare with actual code
    alert("compare with code")

  }

  render(){
    return (
      <View className="step2">
        <Card>
          <CardItem>
            <Input onChangeText={this.setInputCode.bind(this)} value={this.props.thisVal} maxLength={4}/>
          </CardItem>
          <CardItem>
            <Text>
              Please enter the 4 digit phone verification code that was just texted to you.
            </Text>
          </CardItem>
          <CardItem>
            <Text>
              Input message
            </Text>
          </CardItem>
        </Card>
      </View>
    )
  }
}
