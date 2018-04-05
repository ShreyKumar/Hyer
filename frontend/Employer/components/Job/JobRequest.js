import React from "react";
import {View, Text, Button} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class JobRequest extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        jobID: this.props.job,
        Jname: "",
        Jpay: "",
        Jstatus: "",
        applicant: "",
        firstname: "",
        lastname: "",
        bio: "",
    }

    fetch("https://hyer.herokuapp.com/jobs?jobID=" + this.props.job, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
            response.json().then((jobs) => {
              console.log("Found jobs by id")
              this.setState({applicant: jobs[0][this.props.job]["applicants"],
                Jname: jobs[0][this.props.job]["name"],
                Jpay: jobs[0][this.props.job]["pay"],
                Jstatus: jobs[0][this.props.job]["status"]
              });
              console.log("applicant " + this.state.applicant)

              fetch("https://hyer.herokuapp.com/users?username=" + jobs[0][this.props.job]["applicants"], {
              }).then((res) => {
                res.json().then((user) => {
                    console.log("Found Applicant")
                    console.log(user)
                    this.setState({
                         firstname: user[0][this.state.applicant]["firstName"],
                         lastname: user[0][this.state.applicant]["lastName"],
                         bio: user[0][this.state.applicant]["bio"]
                    })
                })
              }).catch((err) => {
                console.log(err);
              })
            })
          }).catch((error) => {
            console.error(error);
          })
        }

    accept = () => {
        this.setState({Jstatus: "in progress"})
        fetch("https://hyer.herokuapp.com" + "/put/jobs", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            jobID: this.state.jobID,
            status: "in progress",
            applicants: "",
            hired: this.state.applicant
          })
        }).then((resp) => {
          resp.json.then((res) => {
              alert("accepted!");
                console.log("updated Job");
                console.log(res);
                this.props.home();
            })
        }).catch((err) => {
          console.error(err);
        })
    }

    decline = () => {
        this.setState({Jstatus: "open"})
        fetch("https://hyer.herokuapp.com" + "/put/jobs", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            jobID: this.state.jobID,
            status: "open",
            applicants: " "
          })
        }).then((resp) => {
          resp.json.then((res) => {
            alert("declined");
              console.log("updated Job");
              console.log(res);
              this.props.home();
          })

        }).catch((err) => {
          console.error(err);
        })
    }

render(){
    return (
      <Container>
        <Content>
          <Text>Applicant profile for {this.state.Jname}</Text>
          <Card>
          <CardItem header>
            <Text>Name</Text>
          </CardItem>

          <CardItem>
            <Text>{this.state.firstname} , {this.state.lastname}</Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem header>
            <Text>Bio</Text>
          </CardItem>

          <CardItem>
            <Text>{this.state.bio}</Text>
          </CardItem>
        </Card>
          <View>
            <Button
                onPress={() => this.accept()}
                color="#2db300"
                title="Accept"/>
            <Button
                onPress={() => this.decline()}
                color="#ff0000"
                title="Decline" />
          </View>
        </Content>
      </Container>
    );
  }


}

