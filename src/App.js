import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Waypoint } from 'react-waypoint'
import YouTube from 'react-youtube'

import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import './App.css'

import Invite from './invite.js'
import foil from './img/foil.jpg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'

const request = require('request-promise')

const hostname = window && window.location && window.location.hostname
let bURL = 'https://invite.nancyandanand.com'

const B_MOCK = true
let IS_MOCK = false
let IS_LOCAL = false
let logger = (...args) => {}

if (!hostname.includes('nancy') && B_MOCK) {
  bURL = `http://${hostname}:8080`
  IS_LOCAL = true
  logger = console.log
}

if (hostname === 'nancyandanand.com') {
  IS_MOCK = false
  IS_LOCAL = false
}

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props)

    let id = props.cookies.get('id') || null
    if (IS_MOCK) {
      id = 'helloId'
    }
    this.state = {}
    setTimeout(() => {
      if (window && window.L && window.L.Wrld) {
        console.log('LOADED')
        const fox = [33.7726272, -84.3866794]

        const map = window.L.Wrld.map(
          'map',
          '21475d0804e530c16af25671b935cc3a',
          {
            headingDegrees: 0,
            center: fox,
            zoom: 18
          }
        )
        var marker = window.L.marker(fox, { title: 'My marker' }).addTo(map)

        let deg = 0
        function move() {
          deg = deg + 90
          console.log('Set View')
          map.setView(fox, 18, {
            headingDegrees: deg,
            animate: true,
            durationSeconds: 20
          })
          setTimeout(function() {
            console.log('deg', deg)
            move()
          }, 10000)
        }
        setTimeout(() => {
          move()
        }, 5000)
      }
    }, 1000)

    this.handleEnterStage = this.handleEnterStage.bind(this)
  }

  handleEnterStage(data) {
    if (data.currentPosition === 'above' || data.currentPosition === 'inside') {
      console.log('enter theatre, nav off', data)
      // document.getElementById('App').classList.add('darken')
    }

    if (
      data.currentPosition === 'inside' &&
      data.previousPosition === 'above'
    ) {
      console.log('leave theatre, run on nav')
      // document.getElementById('App').classList.remove('darken')
    }
  }

  render() {
    const API_KEY = 'AIzaSyCqnOPWWqsgOJXtw2H_P6AjtYUJjPF0RD4'

    var storySettings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplaySpeed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: true
    }

    const navBar = () => {
      return (
        <Navbar expand="sm" sticky="top">
          <Navbar.Brand href="#home">N&A</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* Used to justify right */}
            <div className="mr-auto"></div>
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#ourstory">Our Story</Nav.Link>
              <Nav.Link href="#link">What to do</Nav.Link>
              <Nav.Link href="#link">Date</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }

    const eventCard = (place, name, date, times, loc, desc) => {
      return (
        <Row className="event">
          <Col sm={4} className="map-parent">
            <a href="google.com">
              <div className="map-overlay" />
            </a>
            <iframe
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
        </Row>
      )
    }
    const events = () => {
      return (
        <div className="section white">
          <Container className="events">
            <h1>Events</h1>
            {eventCard(
              'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
              'Garba',
              'April 3rd',
              '7:00 pm',
              'Ashiana: 5675 Jimmy Carter Blvd, Norcross, GA',
              "This is your chance to mingle with the guest before the big day. Garba is a form of Indian dance. If you don't know it is quick to pick up. Dress colorful"
            )}

            {eventCard(
              'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
              'Wedding',
              'April 4th 2020',
              '10:00 am',
              'Park Tavern: 500 10th St NE, Atlanta, GA',
              'We will start with the Bharat which is the grooms procession to the venue. Once at the Venue we will have a short Hindu ceremony followed by a lunch. Dress Indian'
            )}

            {eventCard(
              'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
              'Reception',
              'April 4th 2020',
              '7:00 pm',
              'Fox Theater:  660 Peachtree St NE, Atlanta, GA',
              'This is it, the final event. There will be food, performances and more dancing. Dress sharp'
            )}
          </Container>
        </div>
      )
    }
    const food = [
      {
        name: 'STK',
        desc: 'Amazing steak & drinks.',
        link: 'https://stksteakhouse.com/venues/atlanta/#venue-menu-section',
        img:
          'https://lh5.googleusercontent.com/p/AF1QipM2Ty9gW29dpeZTpDuZQFvEs2WHTZ9yzfsBBxHF=h512'
      },
      {
        name: 'Krog Street Market',
        desc: 'Lots of food vendors',
        link: 'https://krogstreetmarket.com/',
        img:
          'https://lh5.googleusercontent.com/p/AF1QipPBAkBiejx3sqV4LjFtHT561USwqvfzuND41WpE=h512'
      },
      {
        name: 'A Mano',
        desc: 'Best Italian resturant',
        link: 'https://www.amanoatl.com/',
        img:
          'https://lh5.googleusercontent.com/p/AF1QipMcHOiu7FhxRh4xg0R8Fz7P9RIH-5pB1zYcoR96=h512'
      },
      {
        name: 'Alma Cocina',
        desc: 'Best Mexican resturant',
        link: 'https://krogstreetmarket.com/',
        img:
          'https://lh5.googleusercontent.com/p/AF1QipN1mmcWPcesZIZ0sZo6G5RqSmuYlIoVHBIiN-e-=h512'
      },
      {
        name: 'Nina & Rafi',
        desc: 'Best Pizza',
        link: 'https://www.ninaandrafi.com/',
        img:
          'https://lh5.googleusercontent.com/p/AF1QipOTBfICmo2YLuGr5mIBm6yhLYzQ2UPKBpXaZ2w3=h512'
      },
      {
        name: 'Dairies',
        desc: 'Best Cafe',
        link: 'https://www.coldbrewbar.com/',
        img:
          'https://lh5.googleusercontent.com/p/AF1QipN-rJGESdMiXaBq-2v-P5tnKA1W163To3iQAwWu=h512'
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
          'https://poncecitymarket.com/wp-content/themes/poncecitymarket/assets/images/header_icon.png'
      },
      {
        name: 'High Museum of Art',
        desc: 'See Pictures',
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
        name: 'Atlantic Station',
        desc: 'Outdoor mall',
        link: 'https://www.atlanticstation.com/',
        img: 'https://assets.speakcdn.com/assets/2500/skyview-2.jpg'
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
        <Card bg="dark" text="white" style={{ width: '30vw' }}>
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
        <div className="section todo pink">
          <Container>
            <h1>Have your own Adventure while your in Atlanta </h1>
            <h2> Food </h2>
            <CardColumns>{food.map(createThingCard)}</CardColumns>

            <h2> Activities </h2>
            <CardColumns>{activities.map(createThingCard)}</CardColumns>
          </Container>
        </div>
      )
    }

    const vidOps = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
        controls: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0
      }
    }

    const _onReady = (event) => {
      // access to player in all event handlers via event.target
      event.target.playVideo()
    }

    return (
      <div className="page">
        <div className="page-top">
          <Container>
            <div className="top-text">
              <h1>The Adventure Begins</h1>
            </div>
          </Container>
          <div
            className="moving-clouds"
            style={{
              backgroundImage: 'url(' + require('./img/clouds.png') + ')'
            }}
          />
        </div>
        {/* {navBar()} */}
        <div className="section pink">
          <Container>
            <h1>Nancy & Anand </h1>
            <h2>Are getting married</h2>
            <h2>April 4th 2020</h2>
          </Container>
        </div>
        {events()}
        {thingsToDo()}
        <a href="/" name="ourstory"></a>
        <Waypoint onPositionChange={this.handleEnterStage} />
        <div className="story">
          <div className="story-stage"></div>
          <div className="story-main">
            {/* <h1 className="story-intro">Our Story</h1> */}
            <div className="story-image">
              <YouTube
                videoId="FTLKdAU4XJM?controls=0"
                opts={vidOps}
                onReady={_onReady}
                lassName="story-video"
              />
            </div>
          </div>
        </div>
      </div>
    )
    // return <Invite />
  }
}

export default withCookies(App)
