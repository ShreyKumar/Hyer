import React from "react";
import {Image, Dimensions} from "react-native";
import {Container} from "native-base";


const win = Dimensions.get("window");

export default class Start extends React.Component {
  render(){
    return (
      <Container style={{backgroundColor: "#00419a"}}>
        <Image style={{width: 100, height: 200, marginLeft: win.width/3 + 20, marginTop: 130}} source={require('../assets/Hyer-logo.png')} />
      </Container>
    )
  }
}
