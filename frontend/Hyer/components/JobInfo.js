import React from "react";
import {Text} from "react-native";
import {Card, CardItem} from "native-base";

export default class JobInfo extends React.Component {
  constructor(props){
    super(props);

    fetch("https://hyer.herokuapp.com/jobs?jobID=" + this.props.id, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log("get specific job");
      response.json().then((data) => {
        console.log(data);
      })
    }).catch((error) => {
      console.error(error)
    })

  }

  render(){
    return (<Text>{this.props.id}</Text>)
  }

}
