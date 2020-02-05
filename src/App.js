import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import { Waypoint } from 'react-waypoint'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import Hotels from './hotels.js'

import './App.css'
// import YouTube from 'react-youtube'
// import Hero from './curtain.js'

const curtains = require('./img/curtain-1.webp')
const flower = require('./img/right-png.webp')

const hostname = window && window.location && window.location.hostname

const B_MOCK = true
let logger = (...args) => {}

if (!hostname.includes('nancy') && B_MOCK) {
  logger = console.log
}

if (hostname === 'nancyandanand.com') {
}

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleEnterStage = this.handleEnterStage.bind(this)
  }

  handleEnterStage(data) {
    if (data.currentPosition === 'above' || data.currentPosition === 'inside') {
      logger('enter theatre, nav off', data)
      // document.getElementById('App').classList.add('darken')
    }

    if (
      data.currentPosition === 'inside' &&
      data.previousPosition === 'above'
    ) {
      logger('leave theatre, run on nav')
      // document.getElementById('App').classList.remove('darken')
    }
  }

  render() {
    const navBar = () => {
      return (
        <Navbar expand="sm" sticky="top">
          <Navbar.Brand href="#home">#TheAdventureBegins</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* Used to justify right */}
            <div className="mr-auto"></div>
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#events">Events</Nav.Link>
              <Nav.Link href="#hotels">Hotels</Nav.Link>
              <Nav.Link href="#todo">Things to do</Nav.Link>
              <Nav.Link href="#ourstory">Our Story</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }

    const eventCard = (place, name, date, times, loc, desc, url) => {
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
    const events = () => {
      return (
        <div className="section white-marble">
          <Container className="events">
            <h1>Events</h1>
            {eventCard(
              'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
              'Garba',
              'April 3rd',
              '7:00 pm',
              'Ashiana: 5675 Jimmy Carter Blvd, Norcross, GA',
              "This is your chance to mingle with the other guests before the big day. Garba is a folk dance that originates from the state of Gujarat in India, where Nancy and Anand's families are from. Do not worry if you don't know it, it is easy to pick up! Dress colorfully.",
              'https://goo.gl/maps/YidKb36x7KoyfxsE9'
            )}

            {eventCard(
              'place_id:ChIJRwFXzj0E9YgRkpI_K4PvVeU',
              'Wedding',
              'April 4th 2020',
              '10:00 am',
              'Park Tavern: 500 10th St NE, Atlanta, GA',
              "We will start with the Bharat, which is the groom's procession to the venue. Once at the venue we will have a short Hindu ceremony followed by a lunch. Dress Indian.",
              'https://g.page/park-tavern-atlanta?share'
            )}

            {eventCard(
              'place_id:ChIJ28DQdm8E9YgRnsZ4YZ94nRo',
              'Reception',
              'April 4th 2020',
              '7:00 pm',
              'Fox Theater:  660 Peachtree St NE, Atlanta, GA',
              'This is it - the final event. There will be food, performances and more dancing. Dress sharp.',
              'https://goo.gl/maps/Qc85TqNm8qa2HeH5A'
            )}
          </Container>
        </div>
      )
    }
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
            <Card.Link href={link}>Explore</Card.Link>
          </Card.Body>
        </Card>
      )
    }

    const thingsToDo = () => {
      return (
        <div className="section todo white">
          <Container>
            <h1>Have your own Atlanta Adventure </h1>
            <h2> Food </h2>
            <CardColumns>{food.map(createThingCard)}</CardColumns>

            <h2> Activities </h2>
            <CardColumns>{activities.map(createThingCard)}</CardColumns>
          </Container>
        </div>
      )
    }

    // const vidOps = {
    //   height: '390',
    //   width: '640',
    //   playerVars: {
    //     autoplay: 0,
    //     controls: 1,
    //     iv_load_policy: 3,
    //     modestbranding: 1,
    //     rel: 0
    //   }
    // }

    // const _onReady = (event) => {
    //   // access to player in all event handlers via event.target
    //   event.target.playVideo()
    // }

    const names = () => {
      return (
        <div className="section names pink">
          <div className="name-text">
            <img alt="" className="name-left" src={flower} />
            <h1>Nancy </h1>
            <h1>& </h1>
            <h1>Anand </h1>
            <h2>Are getting married</h2>
            <h2>April 4th 2020</h2>
            <img alt="" className="name-right" src={flower} />
          </div>
        </div>
      )
    }

    return (
      <div className="page">
        <a href="/" name="home">
          {''}
        </a>
        <div className="page-top">
          <Container>
            <div className="top-text">
              <h1>The Adventure Begins</h1>
            </div>
          </Container>
          <div className="moving-clouds" />
        </div>
        {navBar()}
        {names()}
        <a href="/" name="events" className="spot">
          {''}
        </a>
        {events()}
        <a href="/" name="hotels" className="spot">
          {''}
        </a>
        <Hotels />
        <a href="/" name="todo" className="spot">
          {''}
        </a>
        {thingsToDo()}
        <a href="/" name="ourstory">
          {''}
        </a>
        {/* <Waypoint onPositionChange={this.handleEnterStage} /> */}
        <div className="story">
          <div className="story-stage"></div>
          <div className="story-main">
            {/* <h1 className="story-intro">Our Story</h1> */}
            <div className="story-image">
              <img alt="curtains" className="story-curtain" src={curtains} />
              <div className="bottom-text">
                <h1>Comming Soon</h1>
              </div>
              {/* <Hero /> */}
              {/* <YouTube
                videoId="FTLKdAU4XJM?controls=0"
                opts={vidOps}
                onReady={_onReady}
                lassName="story-video"
              /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withCookies(App)
