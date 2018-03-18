import React from "react";
import {View, Text} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class Jobs extends React.Component {
  constructor(props){
    super(props);

    this.testArr = [(<Text key="hello">Hello </Text>), (<Text key="there">There</Text>)];

    fetch("https://hyer.herokuapp.com/jobs", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      alert("found jobs");
      console.log("start response");
      response.json().then((data) => {
        console.log(data)
      })

      console.log("end reponse");
    }).catch((error) => {
      console.error(error);
    })
  }

  render(){
    return (
      <Container>
        <Content>
          <Text>Jobs</Text>
          {this.testArr}
        </Content>
      </Container>
    );
  }

}
