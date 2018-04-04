import React from "react";
import {Text} from "react-native";

export default class Requests extends React.Component {
  constructor(props){
    super(props)
    const prefix = "https://hyer.herokuapp.com"
    this.jobs = []
    this.state = {
      jobs: []
    }

    fetch(prefix + "/jobs").then((resp) => {
      resp.json().then((data) => {
        for(var i = 0; i < data.length; i++){
          for(jobid in data[i]){
            console.log(data[i][jobid])
            if(data[i][jobid]["hired"] == this.props.thisUser){
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
                  this.jobs.push({
                    data: jobData,
                    employer: {
                      name: employer,
                      phonenumber: userData[0][employer]["phoneNumber"],
                      photo: userData[0][employer]["photo"]
                    }
                  })
                })
              }).catch((err) => {
                alert("error")
                console.error(err)
              })
            }

            if(data[i][jobid]["applicants"] == this.props.thisUser){
              alert("found job applied");
            }
          }
        }
      })
    }).catch((err) => {
      alert("error");
      console.error(err)
    })

    setTimeout(() => {
      alert("loaded jobs")
      if(this.jobs != []){
        this.setState({
          jobs: this.jobs
        })
        console.log(this.state.jobs)
      }
    }, 1000)

  }
  render(){
    return (
      <Text>Job Requests</Text>
    )
  }
}
