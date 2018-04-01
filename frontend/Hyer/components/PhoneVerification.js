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

  phoneactivated = () => {
    alert("activated!");
  }

  verify = () => {
    this.setState({"view": "step2"});
  }

  render(){
    return (
      <Container>
        <Content>
          {(this.state.view == "step1") ? <Step1 updateMain={this.verify.bind(this)}/> : <Step2 updateMain={this.phoneactivated.bind(this)}/>}
        </Content>
      </Container>
    )
  }
}
