import React from "react";
import {View, Text} from "react-native";
import {Button, Card, CardItem} from "native-base";

export default class JobInfo extends React.Component {
  constructor(props){
    super(props);

    this.jobDetails = []
    this.state = {
      "name": "",
      "loaded": false,
      "jobDetails": []
    }
    this.loadjobs()
  }

  loadjobs = () => {
    fetch("https://hyer.herokuapp.com/jobs?jobID=" + this.props.id, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      response.json().then((data) => {
        var jobDetails = []
        for(jobid in data[0]){
          for(field in data[0][jobid]){
            jobDetails.push({
              "field": field,
              "value": data[0][jobid][field]
            })
          }
        }
        this.setState({jobDetails: jobDetails})

      })


      setTimeout(() => {
        if(this.jobDetails != []){
          this.setState({"loaded": true});
        }
      })
    }).catch((error) => {
      console.error(error)
    })

  }


  apply = () => {
    //update on server
    const prefix = "https://hyer.herokuapp.com"
    fetch(prefix + "/put/jobs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "jobID": this.props.id,
        "applicants": this.props.thisUser
      })
    }).then((resp) => {
      //console.log(resp)
      this.loadjobs();
      //this.forceUpdate();
    }).catch((err) => {
      console.error(err)
    })
  }

  render(){
    if(this.state.loaded){
      return (
        <View>
          <Text style={{textAlign: "center"}}>{this.state.name}</Text>

          <Card>
            {
              this.state.jobDetails.map((eachDetail) => {
                if(eachDetail["field"] == "applicants" && eachDetail["value"] != this.props.thisUser){
                  return (<Button key={eachDetail["field"]} onPress={this.apply.bind(this)}><Text>Apply now</Text></Button>)
                } else if(eachDetail["field"] == "applicants" && eachDetail["value"] == this.props.thisUser){
                  return (<Text key={eachDetail["field"]}>You've already applied.</Text>)
                } else if(eachDetail["field"] == "latitude" || eachDetail["field"] == "longitude" || eachDetail["field"] == "photo"){
                  return null
                } else {
                  return (
                      <CardItem key={eachDetail["field"]}>
                        <Text>{eachDetail["field"].charAt(0).toUpperCase() + eachDetail["field"].slice(1) + ": " + eachDetail["value"]}</Text>
                      </CardItem>
                  )
                }
              })
            }
          </Card>
        </View>
      )
    } else {
      return null;
    }

  }

}
