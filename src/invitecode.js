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
    if (!this.state.inviteCode.trim()) {
      return
    }

    this.props.handle(this.state.inviteCode.trim())
  }

  render() {
    if (!this.props.valid) {
      return null
    }

    return (
      <Container className="invite-code rsvp-button">
        <Form onSubmit={this.click}>
          <Form.Group controlId="inviteCode">
            <Form.Label>
              Lookup with your email, phone number, or invite code
            </Form.Label>
            <Form.Control
              value={this.state.inviteCode}
              name="inviteCode"
              type="invite-code"
              onChange={this.change}
              required
              placeholder="Enter email, phone number, or invite code"
            />
          </Form.Group>
          <Button
            className="rsvp-button"
            size="lg"
            type="submit"
            disabled={
              !this.state.inviteCode.trim() || this.state.inviteCode.length < 3
            }
          >
            See Events
          </Button>
        </Form>
      </Container>
    )
  }
}

export default InviteCode
