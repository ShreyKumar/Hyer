import React from "react";
import {View, Text} from "react-native";
import {Container, Button, Form, Item, Input, Label, Content, Card, CardItem} from "native-base";

export default class JobPost extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        url : "https://hyer.herokuapp.com/jobs",
        post : {
            name: null,
            description: null,
            coordinates: {x: 1, y: 1}, //TODO get using gps coord
            pay: null,
            type: null,
            duration: null,
            photo: null,
            tags: null,
            prerequisites: null,
            employer: null, //TODO get username from profile
            status: null
        }
    }
  }

  render(){
    return (
      <Container>
        <Content>
          <Text>Create new job posting</Text>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={(value) => this._updatePost("name", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input onChangeText={(value) => this._updatePost("description", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Pay</Label>
              <Input onChangeText={(value) => this._updatePost("pay", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Type</Label>
              <Input onChangeText={(value) => this._updatePost("type", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Duration</Label>
              <Input onChangeText={(value) => this._updatePost("duration", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Employer</Label>
              <Input onChangeText={(value) => this._updatePost("employer", value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Status</Label>
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
         xCoordinate: this.state.post.coordinates.x,
         yCoordinate: this.state.post.coordinates.y,
         value: this.state.post.pay,
         type: this.state.post.type,
         duration: this.state.post.duration,
         photo: this.state.post.photo,
         tags: this.state.post.tags,
         prerequisites:this.state.post.prerequisites,
         employer: this.state.post.employer,
         status: this.state.post.status
      })
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
      console.error(error);
    })
  }

}
