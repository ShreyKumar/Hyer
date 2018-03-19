import React from "react";
import {View, Text, Button} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class Jobs extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      "loaded": false
    }

    this.jobs = []

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

        for(row in data){
          this.jobs.push({
            id: row,
            info: data[row]
          })
          console.log("inside");
          console.log(this.jobs);
        }


      })

      setTimeout(() => {
        console.log("saved?");
        console.log(this.jobs);

        if(this.jobs != []){
          this.setState({"loaded": true})
        }
      }, 2000)

      console.log("end reponse");
    }).catch((error) => {
      console.error(error);
    })
  }

  render(){

    if(this.state.loaded){
      return (
        <Container>
          <Content>
          <Text>Jobs</Text>
          {
            this.jobs.map((eachJob) => {
                console.log(this.jobs);
                return (
                  <Card key={eachJob["id"]}>
                    <CardItem>
                      <Text>
                        {eachJob["info"]["name"]}
                      </Text>
                    </CardItem>
                    <CardItem>
                      <Text>
                        {eachJob["info"]["description"]}
                      </Text>
                    </CardItem>
                    <CardItem>
                      <Button onPress={() => this.props.updateMain(eachJob["id"])} title="More info" />
                    </CardItem>
                  </Card>
                )
            })
          }
          </Content>
        </Container>
      )
    } else {
      return (<Text>Loading jobs...</Text>);
    }
  }



}
