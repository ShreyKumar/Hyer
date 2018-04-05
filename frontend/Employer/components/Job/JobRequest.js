import React from "react";
import {View, Text, Button} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class JobEdit extends React.Component {
  constructor(props){
    super(props);

    var url = "https://hyer.herokuapp.com/jobs"
    this.state = {
        loaded: false
    }

//    fetch(url + "?employer=" + username, {
//      method: "GET",
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json',
//      },
//    }).then((response) => {
//            alert("found jobs");
//            console.log("start response");
//            response.json().then((jobs) => {
//              console.log(jobs)
//
//              for(var i = 0; i < jobs.length; i++){
//                for(jobid in jobs[i]){
//                  this.jobs.push({
//                    id: jobid,
//                    info: jobs[i][jobid]
//                  })
//                }
//              }
//            })
//
//            setTimeout(() => {
//              console.log("saved?");
//              console.log(this.jobs);
//
//              if(this.jobs != []){
//                this.setState({"loaded": true})
//              }
//            }, 2000)
//
//            console.log("end reponse");
//          }).catch((error) => {
//            console.error(error);
//          })
//        }
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

