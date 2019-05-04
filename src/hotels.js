import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Hotels extends Component {
  render() {
    const getBody = () => {
      if (this.props.info.rate === "0") {
        return (
          <p>
            We have already reserved a room for you at the {this.props.info.name}.
            <br />
            You will receive your hotel information once you RSVP.
            <br />
            Transportation will be provided from the venues and the hotel.
            <br />
          </p>
        )
      }

      return (
        <p>
          You have been assigned to {this.props.info.name}.
          <br />
          The block rate is {this.props.info.rate} plus tax per night.
          <br />
          We will send you a link to reserve your room once you RSVP.
          <br />
          Transportation will be provided from the venues and the hotel.
          <br />
        </p>
      )
    }

    return (
      <Row className="hotels">
        <Col>
          <h1> Hotel </h1>
          {getBody()}
        </Col>
      </Row>
    )
  }
}

export default Hotels
