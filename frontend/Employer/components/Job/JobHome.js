import React from "react";
import {View, Text} from "react-native";
import {Container, Content, Card, CardItem, Button} from "native-base";

import JobPost from "./JobPost.js"
import JobRequest from "./JobRequest.js"

export default class Jobs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        "view": "home",
        "username": this.props.username
    }
    this.view = null;

  }

  render(){
    if (this.state.view == "home"){
      this.view = (
          <View>
          <Button block style={{marginTop: 30}} onPress={() => this.setState({"view": "post"})}>
             <Text>Create a new posting</Text>
          </Button>

          <Button block style={{marginTop: 10}} onPress={() => this.setState({"view": "request"})}>
             <Text>View requests</Text>
          </Button>
          </View>
        )
    }

    return (
        <Container>
            <Content>
                <View>
                <Text>Welcome {this.state.username} !</Text>
                {(this.state.view == "post") ? <JobPost username={this.state.username}/> : null}
                {(this.state.view == "request") ? <JobRequest/> : null}
                {this.view}
                </View>
            </Content>
        </Container>
    );
  }

}
