import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class InviteCode extends Component {
  constructor(p) {
    super(p)
    this.state = {
      inviteCode: ''
    }

    this.change = this.change.bind(this)
    this.click = this.click.bind(this)
  }

  change(event) {
    this.setState({
      inviteCode: event.target.value
    })
  }

  click() {
    this.props.handle(this.state.inviteCode)
  }

  render() {
    if (!this.props.valid) {
      return null
    }

    return (
      <Container className="invite-code rsvp-button">
        <Form>
          <Form.Group controlId="inviteCode">
            <Form.Label>Check your invitation message for the code</Form.Label>
            <Form.Control
              value={this.state.inviteCode}
              name="inviteCode"
              type="invite-code"
              onChange={this.change}
              required
              placeholder="Enter Invite Code"
            />
          </Form.Group>
          <Button
            className="rsvp-button"
            size="lg"
            onClick={this.click}
            disabled={this.state.inviteCode === ''}
          >
            See Events
          </Button>
        </Form>
      </Container>
    )
  }
}

export default InviteCode
