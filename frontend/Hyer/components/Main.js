import React from "react"
import Login from "./Login.js"
import Signup from "./Signup.js"

import { Header, Container, Title } from "native-base"

export default class Main extends React.Component {
  render() {
    return (
      <Container className="main-container">
        <Header>
          <Title> Welcome to Hyer! </Title>
        </Header>
        <Login />
        <Signup />
      </Container>

    )
  }
}
