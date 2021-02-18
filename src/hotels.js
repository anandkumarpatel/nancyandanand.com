import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

const hotels = [
  {
    name: 'Sonesta Select Atlanta Midtown Georgia Tech',
    link:
      'https://gc.synxis.com/rez.aspx?Hotel=32565&Chain=5157&group=2104PATELW_001',
    img:
      'https://res.cloudinary.com/sonesta/image/fetch/c_crop,x_0,y_242,w_1920,h_801,q_auto:good,f_auto,fl_force_strip.lossy.progressive/c_scale,w_1920/https%3A%2F%2Fwww.sonesta.com%2Fsites%2Fdefault%2Ffiles%2Fatlmn-low%2520res%2Fatlmn-low%2520res%2Fatlmn-king-guestroom_web.jpg'
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
          <Card.Text>
            Use the link below to make a reservation in our room block before March 18, 2021.
          < br />
          1132 Techwood Drive NW, Atlanta, GA 30318
          </Card.Text>
          <Card.Link href={link}>Book Here</Card.Link>

        </React.Fragment>
      )

      if (this.props.flags.paid) {
        desc = (
          <React.Fragment>
            <Card.Text>
              We have taken care of your room here and will give you room details shortly.
          </Card.Text>
          </React.Fragment>
        )
      }
      return (
        <Card key={name} bg="dark" text="white">
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            {desc}
          </Card.Body>
        </Card>
      )

    }

    const getHotels = () => {
      if (this.props.hotel.name !== "CM") {
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
