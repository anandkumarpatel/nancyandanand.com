import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
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
          <Col sm className="map-parent">
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
              <br />
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
          <div className="content-center">
            <Container className="events">
              <h1>Events</h1>
              {eventCard(
                'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
                'Welcome Dinner & Garba',
                'April 3rd',
                '7:00pm - 10:00pm',
                'Ashiana: 5675 Jimmy Carter Blvd #101, Norcross, GA 30071',
                "Prepare to eat and dance the night away. This is your chance to mingle with the guest before the big day. Garba is a form of Indian dance. If you don't know it is quick to pick up. Dress colorful"
              )}

              {eventCard(
                'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
                'Wedding',
                'April 4th 2020',
                '10:00am - 3:00pm',
                'Park Tavern: 500 10th St NE, Atlanta, GA 30309',
                'We will start with the Bharat which is the grooms procession to the venue. Once at the Venue we will have a short Hindu ceremony followed by a lunch. Dress Indian'
              )}

              {eventCard(
                'place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y',
                'Reception',
                'April 4th 2020',
                '7:00pm - 12:00pm',
                'Fox Theater:  660 Peachtree St NE, Atlanta, GA 30308',
                'This is it, the final event. There will be food, performances and more dancing. Dress sharp'
              )}
            </Container>
          </div>
        </div>
      )
    }
    const things = [
      {
        name: 'stk',
        desc: 'great palce to eat',
        link: ''
      },
      {
        name: 'beltline',
        desc: 'great to walk',
        link: ''
      }
    ]

    const thing = (thing) => {
      const name = thing.name
      const desc = thing.desc
      const link = thing.link
      return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{desc}</Card.Text>
            <Card.Link href={link}>Details</Card.Link>
          </Card.Body>
        </Card>
      )
    }

    const thingsToDo = () => {
      return (
        <div className="section pink">
          <div className="content-center">
            <Container>
              <h1>Have your own Adventure while your in Atlanta </h1>
              {things.map(thing)}
            </Container>
          </div>
        </div>
      )
    }

    const vidOps = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
        controls: 0
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
          <div className="content-center">
            <Container>
              <h1>Nancy & Anand </h1>
              <h2>Are getting married</h2>
              <h2>April 4th 2020</h2>
            </Container>
          </div>
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
