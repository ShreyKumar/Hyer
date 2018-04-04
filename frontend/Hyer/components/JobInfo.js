import React from "react";
import {View, Text} from "react-native";
import {Card, CardItem} from "native-base";

export default class JobInfo extends React.Component {
  constructor(props){
    super(props);

    this.jobDetails = []
    this.state = {
      "name": "",
      "loaded": false
    }

    fetch("https://hyer.herokuapp.com/jobs?jobID=" + this.props.id, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      response.json().then((data) => {
        for(jobid in data[0]){
          for(field in data[0][jobid]){
            this.jobDetails.push({
              "field": field,
              "value": data[0][jobid][field]
            })
          }
        }
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

  }

  render(){
    if(this.state.loaded){
      return (
        <View>
          <Text style={{textAlign: "center"}}>{this.state.name}</Text>

          <Card>
            {
              this.jobDetails.map((eachDetail) => {
                return (
                    <CardItem key={eachDetail["field"]}>
                      <Text>{eachDetail["field"].charAt(0).toUpperCase() + eachDetail["field"].slice(1) + ": " + eachDetail["value"]}</Text>
                    </CardItem>
                )
              })
            }
          </Card>

          <Button block onPress={() => this.apply()}>
            <Text>Apply for this job</Text>
          </Button>


        </View>
      )
    } else {
      return null;
    }

  }

}
