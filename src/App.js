import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import './App.css'

import Invite from './invite.js'
import foil from './img/foil.jpg'

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
  }
  render() {
    const API_KEY = 'AIzaSyCqnOPWWqsgOJXtw2H_P6AjtYUJjPF0RD4'

    return (
      <React.Fragment>
        <div
          className="page-header section-dark"
          style={{
            backgroundImage: 'url(' + require('./img/main.jpg') + ')'
          }}
        >
          <div className="filter" />
          <Container>
            <div className="title-brand">
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

        <div className="section  pink">
          <div className="content-center">
            <Container>
              <h1>Nancy & Anand </h1>
              <h2>Are getting married</h2>
              <h2>April 4th 2020</h2>
            </Container>
          </div>
        </div>

        <div className="section blue">
          <div className="content-center">
            <Container>
              <h1>Our Story</h1>
            </Container>
          </div>
        </div>

        <div className="section purple">
          <div className="content-center">
            <Container>
              <h1>Events</h1>
              <CardDeck>
                <Card>
                  <iframe
                    name="gMap"
                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y&key=${API_KEY}`}
                  ></iframe>
                  <Card.Body>
                    <Card.Title>Welcome Garba</Card.Title>
                    <Card.Text>
                      <br />
                      April 3rd <br />
                      7:00pm - 10:00pm <br />
                      Ashiana <br />
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      5675 Jimmy Carter Blvd #101, Norcross, GA 30071
                    </small>
                  </Card.Footer>
                </Card>
                <Card>
                  <div id="map" className="map"></div>

                  {/* <iframe
                    src="https://maps.wrld3d.com/fullembed/?mapscene=42d969c"
                    frameborder="0"
                    allowfullscreen
                  ></iframe> */}
                  {/* <iframe
                    name="gMap"
                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y&key=${API_KEY}`}
                  ></iframe>{' '} */}
                  <Card.Body>
                    <Card.Title>Wedding</Card.Title>
                    <Card.Text>
                      <br />
                      April 4th 2020 <br />
                      9:00am - 3:00pm <br />
                      Park Tavern <br />
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      500 10th St NE, Atlanta, GA 30309
                    </small>
                  </Card.Footer>
                </Card>
                <Card>
                  <iframe
                    name="gMap"
                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y&key=${API_KEY}`}
                  ></iframe>{' '}
                  <Card.Body>
                    <Card.Title>Reception</Card.Title>
                    <Card.Text>
                      <br />
                      April 4th 2020 <br />
                      7:00pm - 12:00pm <br />
                      Fox Theater <br />
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      660 Peachtree St NE, Atlanta, GA 30308
                    </small>
                  </Card.Footer>
                </Card>
              </CardDeck>
            </Container>
          </div>
        </div>

        <div className="section gray">
          <div className="content-center">
            <Container>
              <h1>What to do</h1>
              Have your own Adventure while your in Atlanta <br />
              Places to eat: <br />
              ponce city market <br />
              krog city market <br />
              <br />
              Things to do: <br />
              Botanical Gardens <br />
              coke museum <br />
              aquarium <br />
              high musem of art. <br />
              <br />
              Hiking: <br />
              Beltline <br />
              Stone Mountai <br />
            </Container>
          </div>
        </div>
      </React.Fragment>
    )
    // return <Invite />
  }
}

export default withCookies(App)
