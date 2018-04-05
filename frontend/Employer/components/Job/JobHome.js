import React from "react";
import {View, Text} from "react-native";
import {Container, Content, Card, CardItem, Button} from "native-base";

import JobPost from "./JobPost.js"
import JobEdit from "./JobEdit.js"
import JobList from "./JobList.js"
import JobRequest from "./JobRequest.js"
import RequestList from "./RequestList.js"

export default class Jobs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        "view": "home",
        "username": this.props.username,
        "jobID": null
    }
    this.view = "";
  }

  home = () => {
    this.setState({"view": "home"})
  }

  edit = (id) => {
    this.setState({"view": "edit", "jobID": id})
  }

  request = (id) => {
    this.setState({"view": "request", "jobID": id})
  }

  render(){
    if (this.state.view == "home"){
      this.view = (
          <View>
          <Button block style={{marginTop: 30}} onPress={() => this.setState({"view": "post"})}>
             <Text>Create a new posting</Text>
          </Button>

          <Button block style={{marginTop: 10}} onPress={() => this.setState({"view": "list"})}>
                       <Text>View Posted Jobs</Text>
                    </Button>

          <Button block style={{marginTop: 10}} onPress={() => this.setState({"view": "requestList"})}>
                     <Text>View Requests</Text>
                  </Button>
          </View>
        )
    } else {
      this.view = null;
    }

    return (
        <Container>
            <Content>
                <View>
                {this.view}
                {(this.state.view == "post") ? <JobPost home={this.home.bind(this)} username={this.state.username}/> : null}
                {(this.state.view == "edit") ? <JobEdit home={this.home.bind(this)} job={this.state.jobID}/> : null}
                {(this.state.view == "request") ? <JobRequest home={this.home.bind(this)} job={this.state.jobID}/> : null}
                {(this.state.view == "list") ? <JobList home={this.home.bind(this)} request={this.request.bind(this)} edit={this.edit.bind(this)} username={this.state.username}/> : null}
                {(this.state.view == "requestList") ? <RequestList request={this.request.bind(this)} home={this.home.bind(this)} username={this.state.username}/> : null}
                </View>
            </Content>
        </Container>
    );
  }

}
