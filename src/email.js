import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class Address extends Component {
  render() {
    if (this.props.inviteEmail !== '') {
      return null
    }

    return (
      <Container
        className="addr">
        <Form>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={this.props.email}
              name='email'
              autoComplete="email"
              type="email"
              onChange={this.props.change}
              required
              placeholder="Enter Email" />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default Address
