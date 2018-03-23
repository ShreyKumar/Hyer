import React from "react";
import {View, Text, Button} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class JobRequest extends React.Component {
  constructor(props){
    super(props);

    var url = "https://hyer.herokuapp.com/jobs"
    this.state = {}

    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      alert("found jobs");
      console.log("start response");
      response.json().then((data) => {
        console.log(data)
      })

      console.log("end response");
    }).catch((error) => {
      console.error(error);
    })
  }

  render(){
    return (
      <Container>
        <Content>
          <View>
            <Button
                onPress={() => alert("Job Request Accepted!")}
                color="#2db300"
                title="Accept"/>
            <Button
                onPress={() => alert("Job Request Declined.")}
                color="#ff0000"
                title="Decline" />
          </View>
        </Content>
      </Container>
    );
  }

}
