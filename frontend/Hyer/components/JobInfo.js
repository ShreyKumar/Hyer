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
      console.log("get specific job");
      response.json().then((data) => {
        for(row in data){
          console.log("row!");
          console.log(row);

          if(row == "name"){
            this.setState({"name": data[row]})
          } else if(row == "coordinates"){
          } else {
            this.jobDetails.push({
              "field": row,
              "value": data[row]
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
        </View>
      )
    } else {
      return null;
    }

  }

}
