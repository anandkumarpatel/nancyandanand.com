import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import InviteCode from './invitecode.js'
import bURL from './urlFinder.js'

class Events extends Component {
  createEventCard(place, name, date, times, loc, desc, url) {
    const API_KEY = 'AIzaSyCqnOPWWqsgOJXtw2H_P6AjtYUJjPF0RD4'

    return (
      <Row className="event">
        <div className="event-left" />
        <Col sm={4} className="map-parent">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <div className="map-overlay" />
          </a>
          <iframe
            title={name}
            className="map"
            name="gMap"
            src={`https://www.google.com/maps/embed/v1/place?q=${place}&key=${API_KEY}`}
          />
        </Col>
        <Col className="map-info">
          <h1>{name}</h1>
          <div className="text-detail">
            {date}: {times} <br />
            {loc} <br />
          </div>
          <div className="text-detail">
            <br />
            {desc}
          </div>
        </Col>
        <div className="event-border"></div>
        <div className="event-right" />
      </Row>
    )
  }

  getInviteUrl() {
    if (window.location.hostname.includes('localhost')) {
      return `${bURL}/${this.props.id}`
    }

    return `${bURL}/${this.props.id}`
  }

  getEvents() {
    if (!this.props.gotInvite) {
      this.props.logger('No id, do not show events')
      return (
        <div className="section white-marble">
          <InviteCode
            valid={!this.props.id}
            handle={this.props.submitInviteCode}
          />
        </div>
      )
    }

    return (
      <div className="section white-marble">
        <Container className="events">
          <h1>Events</h1>
          {this.createEventCard(
            'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
            'Garba',
            'April 3rd',
            '7:00 pm',
            'Ashiana: 5675 Jimmy Carter Blvd, Norcross, GA',
            "This is your chance to mingle with the other guests before the big day. Garba is a folk dance that originates from the state of Gujarat in India, where Nancy and Anand's families are from. Do not worry if you don't know it, It’s quick and easy to pick up! Dress colorfully and be ready to dance the night away!",
            'https://goo.gl/maps/YidKb36x7KoyfxsE9'
          )}

          {this.createEventCard(
            'place_id:ChIJRwFXzj0E9YgRkpI_K4PvVeU',
            'Wedding',
            'April 4th 2020',
            '10:00 am',
            'Park Tavern: 500 10th St NE, Atlanta, GA',
            "The main event! We will start with the Bharat, which is the Groom's procession to the venue. Once at the venue, we will have a short Hindu ceremony and will be followed by a traditional Gujarati lunch. Dress Indian.",
            'https://g.page/park-tavern-atlanta?share'
          )}

          {this.createEventCard(
            'place_id:ChIJ28DQdm8E9YgRnsZ4YZ94nRo',
            'Reception',
            'April 4th 2020',
            '7:00 pm',
            'Fox Theater:  660 Peachtree St NE, Atlanta, GA',
            'This is it - the final event. Come celebrate our first evening as husband and wife. There will be food, performances and more dancing. Dress sharp.',
            'https://goo.gl/maps/Qc85TqNm8qa2HeH5A'
          )}
          <Button
            href={this.getInviteUrl()}
            className="invite-button"
            size="lg"
          >
            Goto RSVP
          </Button>
        </Container>
      </div>
    )
  }

  render() {
    return this.getEvents()
  }
}

export default Events
