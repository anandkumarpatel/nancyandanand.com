import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

const food = [
  {
    name: 'STK',
    desc: 'Succulent Steak',
    link: 'https://stksteakhouse.com/venues/atlanta/#venue-menu-section',
    img:
      'https://lh5.googleusercontent.com/p/AF1QipM2Ty9gW29dpeZTpDuZQFvEs2WHTZ9yzfsBBxHF=h600'
  },
  {
    name: 'Krog Street Market',
    desc: 'Various Vendors',
    link: 'https://krogstreetmarket.com/',
    img:
      'https://lh5.googleusercontent.com/p/AF1QipPBAkBiejx3sqV4LjFtHT561USwqvfzuND41WpE=h600'
  },
  {
    name: 'A Mano',
    desc: 'Incredible Italian',
    link: 'https://www.amanoatl.com/',
    img:
      'https://lh5.googleusercontent.com/p/AF1QipMcHOiu7FhxRh4xg0R8Fz7P9RIH-5pB1zYcoR96=h600'
  },
  {
    name: 'Alma Cocina',
    desc: 'Mouthwatering Mexican',
    link: 'https://krogstreetmarket.com/',
    img:
      'https://lh5.googleusercontent.com/p/AF1QipN1mmcWPcesZIZ0sZo6G5RqSmuYlIoVHBIiN-e-=h600'
  },
  {
    name: 'Nina & Rafi',
    desc: 'Potent Pizza',
    link: 'https://www.ninaandrafi.com/',
    img:
      'https://lh5.googleusercontent.com/p/AF1QipOTBfICmo2YLuGr5mIBm6yhLYzQ2UPKBpXaZ2w3=h600'
  },
  {
    name: 'Dairies',
    desc: 'Captivating Cafe',
    link: 'https://www.coldbrewbar.com/',
    img:
      'https://lh5.googleusercontent.com/p/AF1QipN-rJGESdMiXaBq-2v-P5tnKA1W163To3iQAwWu=h600'
  }
]

const activities = [
  {
    name: 'Georgia Aquarium',
    desc: 'See fish',
    link: 'https://www.georgiaaquarium.org/',
    img:
      'https://www.georgiaaquarium.org/wp-content/uploads/2018/07/whale-1-300x143@2x.png'
  },
  {
    name: 'World of Coke',
    desc: 'See where Coke is made',
    link: 'https://www.worldofcoca-cola.com/',
    img: 'http://assets.stickpng.com/thumbs/580b57fbd9996e24bc43c0e3.png'
  },
  {
    name: 'Ponce City Market',
    desc: 'Shopping & Eatting in an old Ford Factory',
    link: 'http://www.poncecitymarket.com/',
    img:
      'https://cdn2.atlantamagazine.com/wp-content/uploads/sites/4/2012/07/0812_Feature_PonceCityMarket.jpg'
  },
  {
    name: 'High Museum of Art',
    desc: "Plenty'o Pictures",
    link: 'https://high.org/',
    img:
      'https://high.org/wp-content/themes/base-theme/assets/logo/high-logo.svg'
  },
  {
    name: 'Beltline',
    desc: 'great to walk',
    link: 'https://beltline.org/',
    img:
      'https://beltlineorg-wpengine.netdna-ssl.com/wp-content/uploads/2018/11/videothumb.jpg'
  },
  {
    name: 'Dads Garage Theatre',
    desc: 'Light Laughts',
    link: 'https://dadsgarage.com/',
    img:
      'https://dadsgarage.com/wp-content/uploads/2016/12/logo_dads-garage.png'
  },
  {
    name: 'Final Four',
    desc: 'Sports!',
    link: 'https://www.ncaa.com/final-four',
    img:
      'https://www.ncaa.com/sites/default/files/public/styles/original/public-s3/tile-images/franchise_hero/logos/20_MBB_FinalFour_FC_RGB%4072_0.png?itok=MRj9xwGW'
  }
]

class Activities extends Component {
  createCards(card) {
    const name = card.name
    const desc = card.desc
    const link = card.link
    const img = card.img
    return (
      <Card bg="dark" text="white">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{desc}</Card.Text>
          <Card.Link href={link}>Explore</Card.Link>
        </Card.Body>
      </Card>
    )
  }

  getActivities() {
    return (
      <div className="section todo white">
        <Container>
          <h1>Have your own Atlanta Adventure </h1>
          <h2> Food </h2>
          <CardColumns>{food.map(this.createCards)}</CardColumns>

          <h2> Activities </h2>
          <CardColumns>{activities.map(this.createCards)}</CardColumns>
        </Container>
      </div>
    )
  }

  render() {
    return this.getActivities()
  }
}

export default Activities
