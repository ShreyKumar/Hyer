import React from "react";
import {} from "react-native";
import {Container, Content, Title, Form, Item, Label, Input, Button, Picker, Text} from "native-base";

export default class Filters extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      "orderby": undefined,
      "searchquery": "",
      "searchby": undefined,
      "radius": 0,
      "fromx": 0,
      "fromy": 0
    }

  }
  //Simple form
  //on submit, change state values in App.js to include a list of fields
  //inside parent function, change to jobs view with search criteria

  render() {
    return (
      <Container className="filters-container">
        <Title>Search Criteia</Title>
        <Content>
        <Form>
          <Picker
            mode="dropdown"
            placeholder="Order by"
            selectedValue={this.state.orderby}
            onValueChange={(val) => this.setState({"orderby": val})}
          >
            <Item label="Pay" value="pay" />
            <Item label="Distance" value="distance" />
          </Picker>

          <Item floatingLabel>
            <Label>Search</Label>
            <Input onChangeText={(text) => this.setState({searchquery: text})}/>
          </Item>

          <Picker
            mode="dropdown"
            placeholder="Search by"
            selectedValue={this.state.searchby}
            onValueChange={(val) => this.setState({"searchby": val})}
          >
            <Item label="Employer" value="employer" />
            <Item label="Name or Tags" value="tags" />
          </Picker>

          <Title>Distance</Title>
          <Item floatingLabel>
            <Label>Radius</Label>
            <Input keyboardType="numeric" onChangeText={(text) => this.setState({radius: text})}/>
          </Item>

          <Item floatingLabel>
            <Label>From X</Label>
            <Input keyboardType="numeric" onChangeText={(text) => this.setState({fromx: text})}/>
          </Item>

          <Item floatingLabel>
            <Label>From Y</Label>
            <Input keyboardType="numeric" onChangeText={(text) => this.setState({fromy: text})}/>
          </Item>

          <Button block style={{marginTop: 30}} onPress={() => this.props.search(this.state)}>
            <Text>Search</Text>
          </Button>
        </Form>
        </Content>
      </Container>
    )
  }
}
