import React from "react";
import {View, Text, Button} from "react-native";
import {Card, CardItem} from "native-base";

export default class Requests extends React.Component {
  constructor(props){
    super(props)
    const prefix = "https://hyer.herokuapp.com"
    this.hiredjobs = []
    this.appliedjobs = []
    this.state = {
      appliedjobs: [],
      hiredjobs: []
    }

    fetch(prefix + "/jobs").then((resp) => {
      resp.json().then((data) => {
        for(var i = 0; i < data.length; i++){
          for(jobid in data[i]){
            console.log(data[i][jobid])
            if(data[i][jobid]["hired"] == this.props.thisUser && data[i][jobid]["applicants"] == this.props.thisUser){
              const employer = data[i][jobid]["employer"]

              //to save
              var jobData = {
                id: jobid,
                name: data[i][jobid]["name"],
                status: data[i][jobid]["status"],
                coords: {
                  lat: data[i][jobid]["latitude"],
                  lon: data[i][jobid]["longitude"]
                }
              }

              fetch(prefix + "/users?username=" + employer).then((resp) => {
                resp.json().then((userData) => {
                  this.hiredjobs.push({
                    data: jobData,
                    employer: {
                      name: employer,
                      phonenumber: userData[0][employer]["phoneNumber"],
                      photo: userData[0][employer]["photo"]
                    }
                  })
                })
              }).catch((err) => {
                console.error(err)
              })
            }

            if(data[i][jobid]["applicants"] == this.props.thisUser && data[i][jobid]["hired"] != this.props.thisUser){
              this.appliedjobs.push({
                id: jobid,
                name: data[i][jobid]["name"],
                status: data[i][jobid]["status"]
              })
            }
          }
        }
      })
    }).catch((err) => {
      console.error(err)
    })

    setTimeout(() => {
      if(this.appliedjobs != [] && this.hiredjobs != []){
        this.setState({
          appliedjobs: this.appliedjobs,
          hiredjobs: this.hiredjobs
        })
      }
    }, 1000)

  }
  render(){
    return (
      <View>
        <Text>Job Requests</Text>
        {
          this.state.appliedjobs.map((eachJob) => {
            return (
              <Card key={eachJob["id"]}>
                <CardItem>
                  <Text>Name: {eachJob["name"]}</Text>
                </CardItem>
                <CardItem>
                  <Text>Status: {eachJob["status"]}</Text>
                </CardItem>
                <Button color="#00419A" title="More info" onPress={() => this.props.updateMain(eachJob["id"])} />
              </Card>
            )
          })
        }
        {
          this.state.hiredjobs.map((eachJob) => {
            return (
              <Card key={eachJob["data"]["id"]}>
                <CardItem>
                  <Text>Name: {eachJob["data"]["name"]}</Text>
                </CardItem>
                <CardItem>
                  <Text>Status: {eachJob["data"]["status"]}</Text>
                </CardItem>
                <CardItem>
                  <Text>Location: ({eachJob["data"]["coords"]["lat"]}, {eachJob["data"]["coords"]["lon"]})</Text>
                </CardItem>
                <CardItem>
                  <Text>You have been hired! Please contact your employer below.</Text>
                </CardItem>
                <CardItem>
                  <Text>Photo: {eachJob["employer"]["photo"]}</Text>
                </CardItem>
                <CardItem>
                  <Text>Name: {eachJob["employer"]["name"]}</Text>
                </CardItem>
                <CardItem>
                  <Text>Number: {eachJob["employer"]["number"]}</Text>
                </CardItem>
                <Button color="#00419A" title="More info" onPress={() => this.props.updateMain(eachJob["data"]["id"])} />
              </Card>
            )
          })
        }
      </View>
    )
  }
}
