import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

class Hotels extends Component {
  render() {
    const createThingCard = (thing) => {
      const name = thing.name
      const desc = thing.desc
      const link = thing.link
      const img = thing.img
      return (
        <Card bg="dark" text="white">
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{desc}</Card.Text>
            <Card.Link href={link}>Website</Card.Link>
          </Card.Body>
        </Card>
      )
    }

    const thingsToDo = () => {
      const hotels = [
        {
          name: 'Georgian Terrece',
          desc:
            '659 Peachtree Street NE Atlanta, Georgia 30308 | (404) 897-1991 ',
          link: 'https://www.thegeorgianterrace.com/',
          img:
            'https://lh5.googleusercontent.com/p/AF1QipPnAPLo9OYEs-UekZqOPZqgP3kI5DuNBdm1D8UN=h600'
        },
        {
          name: 'Courtyard Marriott',
          desc: '1132 Techwood Dr NW, Atlanta, GA 30318 | (404) 607-1112',
          link:
            'https://www.marriott.com/hotels/travel/atlmn-courtyard-atlanta-midtown-georgia-tech/?scid=bb1a189a-fec3-4d19-a255-54ba596febe2',
          img:
            'https://lh5.googleusercontent.com/p/AF1QipNvWj0LccNpYgRl-Z4CbhVzravLpvbWT5Yvt_77=h600'
        },
        {
          name: 'Lowes',
          desc: '1065 Peachtree St NE, Atlanta, GA 30309 | (404) 745-5000',
          link: 'https://www.loewshotels.com/atlanta-hotel',
          img:
            'https://lh5.googleusercontent.com/p/AF1QipNJ65sshRuykAsSVX3ZbqWa5EY_wHJ2pjAN8fyz=h600'
        }
      ]

      return (
        <div className="section hotel pink">
          <Container>
            <h1> Hotels </h1>
            <CardDeck>{hotels.map(createThingCard)}</CardDeck>
          </Container>
        </div>
      )
    }

    return thingsToDo()
  }
}

export default Hotels
