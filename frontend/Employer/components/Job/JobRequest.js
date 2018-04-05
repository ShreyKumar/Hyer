import React from "react";
import {View, Text, Button} from "react-native";
import {Container, Content, Card, CardItem} from "native-base";

export default class JobRequest extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        jobID: this.props.job,
        Jname: "",
        Jemployer: "",
        employerCredit: "",
        Jpay: "",
        Jstatus: "",
        applicant: "",
        firstname: "",
        lastname: "",
        email: "",
        bio: "",
        credit: ""
    }

    fetch("https://hyer.herokuapp.com/jobs?jobID=" + this.props.job, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
            console.log("searching for job " + this.props.job)
            response.json().then((jobs) => {
              console.log("Found jobs by id")
              console.log("job " + jobs[0][this.props.job]["status"])
              this.setState({
                applicant: jobs[0][this.props.job]["applicants"],
                Jname: jobs[0][this.props.job]["name"],
                Jpay: jobs[0][this.props.job]["pay"].toString(),
                Jstatus: jobs[0][this.props.job]["status"],
                Jemployer: jobs[0][this.props.job]["employer"]
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
                         email: user[0][this.state.applicant]["email"],
                         bio: user[0][this.state.applicant]["bio"],
                         credit: user[0][this.state.applicant]["credits"].toString()
                    })
                }).catch((err) => (console.log(err)))
              }).catch((err) => {
                console.log(err);
              })

              fetch("https://hyer.herokuapp.com/users?username=" + jobs[0][this.props.job]["employer"], {
                }).then((res) => {
                  res.json().then((user) => {
                      console.log("Found Employer")
                      console.log(user)
                      this.setState({
                           employerCredit: user[0][this.state.Jemployer]["credits"].toString()
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
        this.props.home();
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

                console.log("updated Job");
                console.log(resp)
        }).catch((err) => {
          console.error(err);
        })
    }

    decline = () => {
        this.setState({Jstatus: "open"})
      this.props.home();
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
              console.log("updated Job");
              console.log(resp);

        }).catch((err) => {
          console.error(err);
        })
    }

    finish = () => {
            ecr = parseInt(this.state.employerCredit) - parseInt(this.state.Jpay);
            wcr = parseInt(this.state.credit) + parseInt(this.state.Jpay);
            this.setState({
                Jstatus: "complete",
                employerCredit: ecr.toString(),
                credit: wcr.toString()
            })
            console.log("employer credit: " + this.state.employerCredit + "  employee credit: " + ecr.toString() + "   " + ecr)
            // Update job
            fetch("https://hyer.herokuapp.com" + "/put/jobs", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                jobID: this.state.jobID,
                status: "complete"
              })
            }).then((resp) => {
                  console.log("Job Complete");
                  console.log(resp);
            }).catch((err) => {
              console.error(err);
            })

            // Update employer
            fetch("https://hyer.herokuapp.com" + "/put/users", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: this.state.Jemployer,
                credits: ecr.toString()
              })
            }).then((resp) => {
                  console.log("Employer updated");
                  console.log(resp);
            }).catch((err) => {
              console.error(err);
            })

            // Update employee
            fetch("https://hyer.herokuapp.com" + "/put/users", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: this.state.applicant,
                credits: wcr.toString()
              })
            }).then((resp) => {
                  console.log("Employee Updated");
                  console.log(resp);
                  this.props.home();
            }).catch((err) => {
              console.error(err);
            })
        }

    close = () => {
        this.setState({Jstatus: "closed"})
        fetch("https://hyer.herokuapp.com" + "/put/jobs", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            jobID: this.state.jobID,
            status: "closed"
          })
        }).then((resp) => {
              console.log("Closed Job");
              console.log(resp);
              this.props.home();

        }).catch((err) => {
          console.error(err);
        })
    }


render(){

    if (this.state.Jstatus == "") {
        return (<Text>Loading...</Text>)
    } else if (this.state.Jstatus == "open") {
        return (
          <Container>
            <Content>
                      <Card title="Job Info">
                       <CardItem>
                           <Text>Job:  {this.state.Jname}</Text>
                        </CardItem>
                        <CardItem>
                           <Text>Pay:  {this.state.Jpay}</Text>
                        </CardItem>
                        <CardItem>
                           <Text>Status:  {this.state.Jstatus}</Text>
                         </CardItem>

                    </Card>


                    <Card title="Employee Info">

                      <CardItem>
                        <Text>Name:  {this.state.firstname}, {this.state.lastname}</Text>
                      </CardItem>
                      <CardItem>
                        <Text>Bio:  {this.state.bio}</Text>
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
                <Button
                    onPress={() => this.props.home()}
                    title="Home" />
              </View>
            </Content>
          </Container>
        );
    } else if (this.state.Jstatus == "in progress") {
        return (
          <Container>
            <Content>
                      <Card title="Job Info">
                         <CardItem>
                             <Text>Job:  {this.state.Jname}</Text>
                          </CardItem>
                          <CardItem>
                             <Text>Pay:  {this.state.Jpay}</Text>
                          </CardItem>
                          <CardItem>
                             <Text>Status:  {this.state.Jstatus}</Text>
                           </CardItem>

                      </Card>


                      <Card title="Employee Info">

                        <CardItem>
                          <Text>Name:  {this.state.firstname}, {this.state.lastname}</Text>
                        </CardItem>
                        <CardItem>
                          <Text>Email:  {this.state.email}</Text>
                        </CardItem>
                        <CardItem>
                          <Text>Bio:  {this.state.bio}</Text>
                        </CardItem>
                      </Card>

              <View>
                <Button
                    onPress={() => this.finish()}
                    color="#2db300"
                    title="Mark Complete"/>
                <Button
                    onPress={() => this.close()}
                    color="#ff0000"
                    title="Close Request" />
                <Button
                    onPress={() => this.props.home()}
                    title="Home" />
              </View>
            </Content>
          </Container>
          )
    } else {
        return (
        <Container>
                    <Content>
                      <Card title='Job Info'>
                         <CardItem>
                             <Text>Job:  {this.state.Jname}</Text>
                          </CardItem>
                          <CardItem>
                             <Text>Pay:  {this.state.Jpay}</Text>
                          </CardItem>
                          <CardItem>
                             <Text>Status:  {this.state.Jstatus}</Text>
                           </CardItem>

                      </Card>


                      <Card title="Employee Info">

                        <CardItem>
                          <Text>Name:  {this.state.firstname}, {this.state.lastname}</Text>
                        </CardItem>
                        <CardItem>
                          <Text>Email:  {this.state.email}</Text>
                        </CardItem>
                        <CardItem>
                          <Text>Bio:  {this.state.bio}</Text>
                        </CardItem>
                      </Card>

                      <View>
                        <Button
                            onPress={() => this.props.home()}
                            title="Home" />
                      </View>
                    </Content>
                  </Container>
                  );
    }
  }


}

