import React from "react";
import { Text, TextInput } from "react-native";
import { Container, Title, Content, Form, Item, Label, Input, Button } from "native-base";

export default class Signup extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confpassword: "",
      errors: {}
    }


  }

  validate = () => {
    //check if errors object is not null, then redirect if not
    var prefix = "https://hyer.herokuapp.com";
    fetch(prefix + "/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        email: this.state.email,
        phoneNumber: "",
        bio: "",
        photo: ""
      })
    }).then((msg) => {
      console.log(msg);
      this.props.updateMain()
    }).catch((err) => {
      alert("error!")
      console.error(err)
    });

  }

  isEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleField = (field, text) => {
    var currentErrors = this.state.errors;

    if(field == "username"){
      this.setState({"username": text});
    } else if(field == "firstname"){
      this.setState({"firstname": text});
    } else if(field == "lastname"){
      this.setState({"lastname": text});
    } else if(field == "email"){
      this.setState({"email": text});

      if(this.isEmail(text)){
        currentErrors.email = "Invalid Email!"
      } else {
        delete currentErrors.email
      }
    } else if(field == "password"){
      this.setState({"password": text});

      //contains 1 digit and is more than 5 characters
      if(this.state.password.search(/\d/) != -1 && this.state.password.length > 5){
        currentErrors.password = "Passwords must be alpha-numeric more than 5 characters";
      } else {
        delete currentErrors.password
      }
    } else {
      this.setState({"confpassword": text});
      if(this.state.password == this.state.confpassword){
        currentErrors.confpassword = "Passwords do not match!";
      } else {
        delete currentErrors.confpassword
      }
    }



    this.setState({errors: currentErrors})
  }

  render() {
    return (
      <Container className="signup-container">
        <Title>Signup</Title>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(text) => this.handleField("username", text)} />
            </Item>
            <Item floatingLabel>
              <Label>Firstname</Label>
              <Input onChangeText={(text) => this.handleField("firstname", text)}/>
            </Item>
            <Item floatingLabel>
              <Label>Lastname</Label>
              <Input onChangeText={(text) => this.handleField("lastname", text)}/>
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input keyboardType="email-address" onChangeText={(text) => this.handleField("email", text)}/>
            </Item>
            <Text>{this.state.errors.email}</Text>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={(text) => this.handleField("password", text)} />
            </Item>
            <Text>{this.state.errors.password}</Text>
            <Item floatingLabel>
              <Label>Confirm Password</Label>
              <Input secureTextEntry onChangeText={(text) => this.handleField("confpassword", text)} />
            </Item>
            <Text>{this.state.errors.confpassword}</Text>
            <Button block onPress={() => this.validate()}>
              <Text>Sign up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
