import React from "react";
import {View, Text, TextInput, KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Item, Label, Input, Button, Card, CardItem} from "native-base";

export default class EditProfile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      jobID: this.props.job,
      name: "",
       description: "",
       pay: "",
       type: "",
       duration: "",
       tags: "",
       prerequisites: ""
    }

    //get request to prefill profile
    var prefix = "https://hyer.herokuapp.com";
    console.log("Editing job" + this.props.job)
    fetch(prefix + "/jobs?jobID=" + this.props.job).then((resp) => {
      resp.json().then((data) => {
        console.log("Fetched job by ID")
        console.log(data);
        this.setState({
            name: data[0][this.state.jobID]["name"],
           description: data[0][this.state.jobID]["description"],
           pay: data[0][this.state.jobID]["pay"].toString(),
           type: data[0][this.state.jobID]["type"],
           duration: data[0][this.state.jobID]["duration"].toString(),
           tags: data[0][this.state.jobID]["tags"],
           prerequisites: data[0][this.state.jobID]["prerequisites"]
        })
      })
    }).catch((error) => {
      alert("Error loading Job Info!");
      console.error(error);
    })

  }

  update = () => {
    var prefix = "https://hyer.herokuapp.com";

    var toSend = {
        jobID: this.state.jobID,
      name: this.state.name,
       description: this.state.description,
       value: this.state.pay,
       type: this.state.type,
       duration: this.state.duration,
       tags: this.state.tags,
       prerequisites: this.state.prerequisites
    }
    console.log("to send");
    console.log(toSend);

    fetch(prefix + "/put/jobs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    }).then((resp) => {
      alert("updated!");
      console.log("updated Job");
      console.log(resp);
      this.props.home();
    }).catch((err) => {
      console.error(err);
    })
  }

  remove = () => {
    fetch("https://hyer.herokuapp.com/delete/jobs", {
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            jobID: this.state.jobID
        })
    }).then((res) => {
        alert("Job Deleted!")
        console.log("removed job");
        console.log(res)
        this.props.home();
    }).catch((err) => {
        console.log(err);
    })
  }

  render() {
    return (
      <Container>
      <Content>
      <KeyboardAvoidingView behavior="padding">
        <Form>
          <Item floatingLabel>
            <Label>Job Name</Label>
            <Input value={this.state.name} onChangeText={(text) => this.setState({name: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Job Pay</Label>
            <Input keyboardType="numeric" value={this.state.pay} onChangeText={(text) => this.setState({pay: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Job Type</Label>
            <Input value={this.state.type} onChangeText={(text) => this.setState({type: text})} />
          </Item>
          <Item floatingLabel>
              <Label>Duration</Label>
              <Input keyboardType="numeric" value={this.state.duration} onChangeText={(text) => this.setState({duration: text})} />
            </Item>
          <Item floatingLabel>
            <Label>Tags</Label>
            <Input value={this.state.tags} onChangeText={(text) => this.setState({tags: text})} />
          </Item>
          <Item floatingLabel>
            <Label>Prerequisites</Label>
            <Input value={this.state.prerequisites} onChangeText={(text) => this.setState({prerequisites: text})} />
          </Item>
          <Card style={{
            marginTop: 30
          }}>
            <CardItem>
                <Label>Description</Label>
              <TextInput style={{
                width: "100%"
              }}
              multiline={true}
              numberOfLines={6}
              maxLength={300}
              placeholder="Description"
              value={this.state.description}
              onChangeText={(text) => this.setState({description: text})}
              allowFontScaling />
            </CardItem>
          </Card>
          <Button block style={{marginTop: 10}} onPress={() => this.update()}>
            <Text>Update</Text>
          </Button>
          <Button block style={{marginTop: 10}} onPress={() => this.remove()}>
              <Text>Delete</Text>
            </Button>
          <Button block style={{marginTop: 10}} onPress={() => this.props.home()}>
              <Text>Cancel</Text>
            </Button>
        </Form>
      </KeyboardAvoidingView>
      </Content>
      </Container>
    )
  }

}