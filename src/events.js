import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Events extends Component {
  upperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getEvent(name) {
    if (!this.props.events[name]) {
      return null
    }
    return (
      <Row>
        <Col sm="6">
          {this.upperCase(name)}
        </Col>
        <Col>
          <button className="bYes ask" onClick={this.props.click(name)} value="Yes" disabled={this.props.events[name] === "Yes"}>Yes</button>
        </Col>
        <Col>
          <button className="bNo ask" onClick={this.props.click(name)} value="No" disabled={this.props.events[name] === "No"}>No</button>
        </Col>
      </Row>
    )
  }

  render() {
    if (Object.keys(this.props.events).length === 0) {
      return null
    }

    return (
      <Container className="events">
        <Row>
          <Col>
            Events
          </Col>
        </Row>
        <Row>
          <Col>
            Wedding
          </Col>
          <Col >
            <button className="bYes ask" disabled={true}>Yes</button>
          </Col>
        </Row>
        {this.getEvent("pithi")}
        {this.getEvent("mehndi")}
      </Container>
    )
  }
}

export default Events