import React from "react";
import {Text} from "react-native";
import {Container, Content} from "native-base";

//get all the other shit
import Step1 from "./PhoneVerification/Step1.js";
import Step2 from "./PhoneVerification/Step2.js";

export default class PhoneVerification extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      "view": "step1"
    }

  }

  render(){
    return (
      <Container>
        <Content>
          <Step1 />
          <Step2 />
        </Content>
      </Container>
    )
  }
}
