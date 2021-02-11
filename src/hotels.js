import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

const hotels = [
  {
    name: 'Courtyard Marriott',
    link:
      'https://www.marriott.com/hotels/travel/atlmn-courtyard-atlanta-midtown-georgia-tech/?scid=bb1a189a-fec3-4d19-a255-54ba596febe2',
    img:
      'https://lh5.googleusercontent.com/p/AF1QipNvWj0LccNpYgRl-Z4CbhVzravLpvbWT5Yvt_77=h600'
  },
]

class Hotels extends Component {
  render() {
    const createThingCard = (thing) => {
      const name = thing.name
      const link = thing.link
      const img = thing.img

      let desc = (
        <React.Fragment>
          To make a reservation please call Marriott reservation at 1(800) 321 - 2211 before March 18, 2021.
          < br />
          Tell them you are part of the Patel Wedding Family Block #2 group
          < br />
          for Courtyard Marriott Atlanta, Midtown / Georgia Tech
          < br />
          located at 1132 Techwood Drive NW, Atlanta, GA 30318
        </React.Fragment>
      )

      if (this.props.flags.paid) {
        desc = (
          <React.Fragment>
            We have taken care of your room here and will give you room details shortly.
          </React.Fragment>
        )
      }
      return (
        <Card key={name} bg="dark" text="white">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {desc}
            </Card.Text>
          </Card.Body>
        </Card>
      )

    }

    const getHotels = () => {
      if (this.props.hotel.name != "CM") {
        return null
      }

      return (
        <div className="section hotel pink">
          <Container>
            <h1> Hotels </h1>
            <CardDeck>{hotels.map(createThingCard)}</CardDeck>
          </Container>
        </div>
      )
    }

    return getHotels()
  }
}

export default Hotels
