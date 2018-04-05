import React from "react";
import {View, Text, Button} from "react-native";
import {Card, CardItem} from "native-base";

export default class Jobs extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      "loaded": false
    }

    var endpoint = ""
    //handle search criteria
    if(this.isNormalSearch(this.props.searchcriteria)){
      endpoint = "/jobs"
    } else {
      var queries = ""
      const crit = this.props.searchcriteria;
      console.log(crit)

      if(crit.orderby != undefined){
        if(queries != ""){
          queries += "&"
        }
        queries += "order=" + crit.orderby
      }

      if(crit.searchby != "" && crit.searchquery != ""){
        if(queries != ""){
          queries += "&"
        }
        queries += crit.searchby + "=" + crit.searchquery
      }

      if(crit.radius != 0 && crit.fromx != 0 && crit.fromy != 0 && crit.orderby == "distance"){
        if(queries != ""){
          queries += "&"
        }
        queries += "km=" + crit.radius + "&longitude=" + crit.fromx + "&latitude=" + crit.fromy
      }

      endpoint = "/jobs?" + queries
    }


    this.jobs = []

    fetch("https://hyer.herokuapp.com" + endpoint, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      response.json().then((jobs) => {

        for(var i = 0; i < jobs.length; i++){
          for(jobid in jobs[i]){
            this.jobs.push({
              id: jobid,
              info: jobs[i][jobid]
            })
          }
        }

        /*
        for(row in data){

          this.jobs.push({
            id: row,
            info: data[row]
          })
          console.log("inside");
          console.log(this.jobs);
        }
        */

      })

      setTimeout(() => {

        if(this.jobs != []){
          this.setState({"loaded": true})
        }
      }, 2000)

    }).catch((error) => {
      console.error(error);
    })
  }

  isNormalSearch = (obj) => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)){
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});

  }

  render(){
    if(this.state.loaded){
      return (
        <View>
        <Button onPress={() => this.props.changeView("search")} title="Search Jobs" />
          <Text>Jobs</Text>
          {
            this.jobs.map((eachJob) => {
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
        </View>
      )
    } else {
      return (<Text>Loading jobs...</Text>);
    }
  }

}
