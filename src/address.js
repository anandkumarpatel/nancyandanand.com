import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class Address extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.address
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let update = {}
    const field = event.target.name
    update[field] = event.target.value
    this.setState(update)
    this.props.change(field, event.target.value)
  }

  render() {
    return (
      <Container
        className="addr">
        <Form>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              value={this.state.street}
              name='street'
              autoComplete="shipping street-address"
              type="street-address"
              onChange={this.handleChange}
              required
              placeholder="Enter Street Address" />
          </Form.Group>
          <Form.Group controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={this.state.city}
              name='city'
              autoComplete="shipping address-level2"
              type="address-level2"
              onChange={this.handleChange}
              required
              placeholder="Enter City" />
          </Form.Group>
          <Form.Group controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control
              value={this.state.state}
              name='state'
              autoComplete="shipping address-level1"
              type="address-level1"
              onChange={this.handleChange}
              required
              placeholder="Enter State or Region" />
          </Form.Group>
          <Form.Group controlId="formBasicZip">
            <Form.Label>Zip / Postal Code</Form.Label>
            <Form.Control
              value={this.state.zip}
              name='zip'
              autoComplete="shipping postal-code"
              type="postal-code"
              onChange={this.handleChange}
              required
              placeholder="Enter Postal Code" />
          </Form.Group>
          <Form.Group controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={this.state.country}
              name='country'
              autoComplete="shipping country"
              type="country"
              onChange={this.handleChange}
              required
              placeholder="Enter Country" />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default Address
