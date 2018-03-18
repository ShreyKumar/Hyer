import React, {Component} from "react";
import {View, Text} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class Jobs extends React.Component {
  constructor(props){
    super(props);

    this.testArr = [(<Text key="hello">Hello </Text>), (<Text key="there">There</Text>)];
    this.state = {isLoading : true,
                    jobData : []}

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
        this.setState({isLoading:false, jobData:data});
      })
      console.log("end response");
    }).catch((error) => {
      console.error(error);
    })
  }

  render(){

    if (this.state.isLoading) {
        return (
            <Container>
                <Content>
                    <Text>Loading...</Text>
                </Content>
            </Container>
        );
    }

    return (
      <Container>
        <Content>
          <Text>Jobs</Text>
          <View>
            { this.jobList() }
          </View>
        </Content>
      </Container>
    );
  }

  jobList () {
    return Object.keys(this.state.jobData).map(job => {
        return (
            // TODO implement touch-to-expand
            <Card>
                <CardItem header>
                    <Text>Job Name: { this.state.jobData[job].name }</Text>
                </CardItem>
                <CardItem>
                    <View>
                        <Text>Address: Address Property?</Text>
                        <Text>Pay: ${ this.state.jobData[job].pay }</Text>
                        <Text>Duration: { this.state.jobData[job].duration }hours</Text>
                    </View>
                </CardItem>
            </Card>
        )}
    )
  }

}
