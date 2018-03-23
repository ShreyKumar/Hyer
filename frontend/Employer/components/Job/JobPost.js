import React from "react";
import {View, Text, KeyboardAvoidingView} from "react-native";
import {Container, Button, Form, Item, Input, Label, Content, Card, CardItem} from "native-base";

export default class JobPost extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        url : "https://hyer.herokuapp.com/jobs",
        latitude: null,
        longitude: null,
        post : {
            name: null,
            description: "N/A",
            pay: null,
            type: null,
            duration: null,
            photo: null,
            tags: "",
            prerequisites: "N/A",
            employer: this.props.username,
            status: null
        }
    }
    console.log(this.state.username);
  }

  render(){
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Job Name</Label>
              <Input onChangeText={(value) => this._updatePost("name", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Job Description</Label>
              <Input onChangeText={(value) => this._updatePost("description", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Total Pay</Label>
              <Input onChangeText={(value) => this._updatePost("pay", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Job Type</Label>
              <Input onChangeText={(value) => this._updatePost("type", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Job Duration</Label>
              <Input onChangeText={(value) => this._updatePost("duration", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Employer</Label>
              <Input onChangeText={(value) => this._updatePost("employer", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Job Status</Label>
              <Input onChangeText={(value) => this._updatePost("status", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Prerequisites</Label>
              <Input onChangeText={(value) => this._updatePost("prerequisites", value)}/>
            </Item>
            <Button block style={{marginTop: 30}} onPress={() => this.postJob()}>
              <Text>Create Posting</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

// Get GPS coordinates
  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

  _updatePost(key, value){
    let post = Object.assign({}, this.state.post);
    post[key] = value;
    this.setState({post});
  }

  postJob(){
    return fetch(this.state.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
         name: this.state.post.name,
         description: this.state.post.description,
         xCoordinate: this.state.latitude,
         yCoordinate: this.state.longitude,
         value: this.state.post.pay,
         type: this.state.post.type,
         duration: this.state.post.duration,
         photo: this.state.post.photo,
         tags: this.state.post.tags,
         prerequisites:this.state.post.prerequisites,
         employer: this.state.username,
         status: this.state.post.status
      })
    }).then((response) => {
        console.log(response)
        if (response.status != 200) {
            alert("Invalid Fields!");
        } else {
            alert("Success! We'll notify you when a request has been made!");
        }
    }).catch((error) => {
      console.error(error);
    })
  }

}
