import React from "react";
import {View, Text, KeyboardAvoidingView} from "react-native";
import {Container, Button, Form, Item, Input, Label, Content, Card, CardItem} from "native-base";

export default class JobPost extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        latitude: 0,
        longitude: 0,
        name: null,
        description: "",
        pay: null,
        type: null,
        duration: null,
        photo: "N/A",
        tags: "N/A",
        prerequisites: "",
        employer: this.props.username
    }
    console.log(this.state.username);
  }

  render(){
    return (
      <Container>
        <Content>
          <KeyboardAvoidingView behavior="padding">
          <Form>
            <Item floatingLabel>
              <Label>Job Name</Label>
              <Input onChangeText={(value) => this.setState({"name": value})}/>
            </Item>
            <Item floatingLabel>
              <Label>Job Type</Label>
              <Input onChangeText={(value) => this.setState({"type": value})}/>
            </Item>
            <Item floatingLabel>
              <Label>Job Duration</Label>
              <Input keyboardType="numeric" onChangeText={(value) => this.setState({"duration": value})}/>
            </Item>
            <Item floatingLabel>
              <Label>Total Pay</Label>
              <Input keyboardType="numeric" onChangeText={(value) => this.setState({"pay": value})} />
            </Item>
            <Item floatingLabel>
              <Label>Prerequisites</Label>
              <Input onChangeText={(value) => this.setState({"prerequisites": value})}/>
            </Item>
            <Item floatingLabel>
              <Label>Job Description</Label>
              <Input onChangeText={(value) => this.setState({"description": value})}/>
            </Item>
            <Button block style={{marginTop: 30}} onPress={() => this.postJob()}>
              <Text>Create Posting</Text>
            </Button>
          </Form>
        </KeyboardAvoidingView>
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
    let post = Object.assign({}, this.state);
    post[key] = value;
    this.setState({post});
  }

  postJob(){
  console.log(JSON.stringify({
       name: this.state.name,
       description: this.state.description,
       longitude: parseFloat(this.state.longitude),
       latitude: parseFloat(this.state.latitude),
       pay: parseFloat(this.state.pay),
       type: this.state.type,
       duration: parseFloat(this.state.duration),
       photo: this.state.photo,
       tags: this.state.tags,
       prerequisites: this.state.prerequisites,
       employer: this.state.username
    }))
    return fetch("https://hyer.herokuapp.com/jobs", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
         name: this.state.name,
         description: this.state.description,
         longitude: this.state.longitude,
         latitude: this.state.latitude,
         value: this.state.pay,
         type: this.state.type,
         duration: this.state.duration,
         photo: this.state.photo,
         tags: this.state.tags,
         prerequisites: this.state.prerequisites,
         employer: this.state.employer
      })
    }).then((response) => {
        console.log(response)
        if (response.status != 200) {
            alert("Invalid Fields!");
        } else {
            alert("Success! We'll notify you when a request has been made!");
            this.props.home();
        }
    }).catch((error) => {
      console.error(error);
    })
  }

}
