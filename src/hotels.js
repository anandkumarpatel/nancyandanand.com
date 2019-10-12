import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HOTEL_MAP = {
  GT: {
    name: "Georgian Terrace",
    homepage: "https://www.thegeorgianterrace.com/",
    booking: "https://book.passkey.com/gt/217407911?gtid=f80bfc4945d8aaa31f95dbc06205dab",
  },
  CM: {
    name: "Courtyard Marriott",
    homepage: "https://www.marriott.com/hotels/travel/atlmn-courtyard-atlanta-midtown-georgia-tech/",
    booking: "https://www.marriott.com/event-reservations/reservation-link.mi?id=1555944203510&key=GRP&app=resvlink",
  },
  LH: {
    name: "Loews Hotel",
    homepage: "https://www.loewshotels.com/atlanta-hotel",
    booking: "https://www.loewshotels.com/atlanta-hotel/thakkarpatel-wedding",
  }
}

const FLIGHT_MAP = {
  sfo: "https://www.google.com/flights?hl=en#flt=SFO.ATL.2020-04-03*ATL.SFO.2020-04-05;c:USD;e:1;sd:1;t:f",
  lhr: "https://www.google.com/flights?hl=en#flt=/m/04jpl.ATL.2020-04-03*ATL./m/04jpl.2020-04-05;c:USD;e:1;sd:1;t:f",
  ord: "https://www.google.com/flights?hl=en#flt=/m/01_d4.ATL.2020-04-03*ATL./m/01_d4.2020-04-05;c:USD;e:1;sd:1;t:f",
}

class Hotels extends Component {

  render() {
    const hotelInfo = HOTEL_MAP[this.props.info.name] || {}
    const name = hotelInfo.name
    if (!name) {
      return null
    }

    const homepage = hotelInfo.homepage
    const booking = hotelInfo.booking

    const flight = FLIGHT_MAP[this.props.flags.flight] || ""

    const getBody = () => {
      if (this.props.info.rate === "0") {
        return (
          <p>
            You will be saying with us at the <a href={homepage}>{name}</a>.
            <br />
            Your room has been taken care of.
            <br />
            Hotel information will be sent out soon after you submit your RSVP.
          </p>
        )
      }

      if (this.props.info.rate === "89") {
        let sKind = 'Family'

        if (this.props.flags.boice) {
          sKind = 'Boice'
        } else if (this.props.flags.gsuite) {
          sKind = 'Bridal'
        }

        return (
          <p>
            You have been assigned to the {sKind} suite at the <a href={homepage}>{name}</a>.
            <br />
            The rate is ${this.props.info.rate} plus tax per night.
            <br />
            Hotel information will be sent out soon after you submit your RSVP.
          </p>
        )
      }

      return (
        <p>
          Our room block is at the <a href={homepage} rel="noopener noreferrer" target="_blank">{name}</a>.
          <br />
          The rate is ${this.props.info.rate} plus tax per night.
          <br />
          <a href={booking} rel="noopener noreferrer" target="_blank">Click here to reserve your hotel room.</a>
        </p>
      )
    }

    const getFlight = () => {
      return !flight ? null : (<p>
        <a href={flight} rel="noopener noreferrer" target="_blank">Click here to find flights.</a>
      </p>)
    }

    return (
      <Row className="hotels">
        <Col>
          <h1> Hotel </h1>
          {getBody()}
          <br />
          <p>Transportation will be provided from the venues and the hotel.</p>
          <br />
          {getFlight()}
        </Col>
      </Row>
    )
  }
}

export default Hotels
