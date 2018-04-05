import React from "react";
import {View, Text, Button} from "react-native";
import {Card, CardItem} from "native-base";

export default class RequestList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      "loaded": false
    }

    this.jobs = []

    fetch("https://hyer.herokuapp.com/jobs?employer=" + this.props.username, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log("start response");
      response.json().then((jobs) => {
        console.log(jobs)

        for(var i = 0; i < jobs.length; i++){
          for(jobid in jobs[i]){
            if (jobs[i][jobid]["status"] == "open") continue;
            else
            this.jobs.push({
              id: jobid,
              info: jobs[i][jobid]
            })
          }
        }

      }).catch((err) => {console.log(err)})

      setTimeout(() => {
        console.log("saved?");
        console.log(this.jobs);

        if(this.jobs != []){
          this.setState({"loaded": true})
        }
      }, 2000)

      console.log("end repsonse");
    }).catch((error) => {
      console.error(error);
    })
  }

  render(){
    if(this.state.loaded){
      if (this.jobs.length < 1){
          return(<View><Text>You have no ongoing request!</Text>
          <Button block style={{marginTop: 10}} onPress={() => this.props.home()} title="Back"/></View>);
        } else
      return (
        <View>
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
                        Status: {eachJob["info"]["status"] + "    "}
                      </Text>
                      <Text>
                        Hyred: {eachJob["info"]["applicants"]}
                      </Text>
                    </CardItem>
                    <View style={{
                             flex: 1,
                             flexDirection: 'row',
                             justifyContent: 'flex-end'
                           }}>
                      <Button block style={{marginLeft: 20}}
                      onPress={() => this.props.request(eachJob["id"])}
                      title="More"
                      />
                    </View>
                  </Card>
                )
            })
          }
        <Button block style={{marginTop: 10}} onPress={() => this.props.home()} title="Back"/>
        </View>
      )
    } else {
      return (<Text>Loading requests...</Text>);
    }
  }

}
