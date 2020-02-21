import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// import { Waypoint } from 'react-waypoint'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import Hotels from './hotels.js'
import Events from './events.js'
import Activities from './activities.js'
import Names from './names.js'
import Story from './story.js'
import bURL from './urlFinder.js'

import './App.css'
const request = require('request-promise')

const hostname = window && window.location && window.location.hostname

const MOCK_CODE = 'Mnx0ZXN0'
const B_MOCK = true
let IS_MOCK = false
let IS_LOCAL = false
let logger = (...args) => {}

const MOCK = {
  people: {
    anand: { isAttending: '?' },
    nancy: { isAttending: '?' },
    Niru: { isAttending: '?' },
    Dhansukh: { isAttending: '?' }
    // "people1": { "isAttending": "?" },
    // "people2": { "isAttending": "?" },
    // "people3": { "isAttending": "?" },
  },
  hotel: {
    rate: '0',
    name: 'GT'
  },
  didRSVP: false,
  gotInvite: true,
  submitted: true,
  flags: {
    afam: 'Yes'
    // flight: "sfo".
    // boice: "Yes"
  },
  events: {
    pithi: 'Yes',
    mehndi: 'Yes'
  },
  email: 'anand@gmail.com'
  // address: {
  //   street: '860 peachtree street NE unit 1814',
  //   city: 'Atlanta',
  //   state: 'Georgia',
  //   zip: '30308',
  //   country: 'USA',
  // }
}

if (!hostname.includes('nancy') && B_MOCK) {
  IS_LOCAL = true
  logger = console.log
}
if (hostname === 'nancyandanand.com') {
  IS_MOCK = false
  IS_LOCAL = false
}

const STORE_NAME = 'inviteid'
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props)

    if (window.location.pathname.length > 1) {
      const getId = window.location.pathname.substring(1)
      window.localStorage.setItem(STORE_NAME, getId)
      window.location.pathname = '/'
    }

    const store = window.localStorage
    const storeId = store.getItem(STORE_NAME)
    let id = storeId || props.cookies.get('id') || null
    if (IS_MOCK) {
      id = MOCK_CODE
    }
    this.state = {
      id,
      didRSVP: false,
      hotel: {},
      people: {},
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      },
      events: {},
      flags: {},
      email: '',
      submitClicked: false,
      updateCodeClicked: false,
      backendUrl: `${bURL}/invite`,
      gotInvite: false,
      invite: {}
    }

    this.handleEnterStage = this.handleEnterStage.bind(this)
    this.submitInviteCode = this.submitInviteCode.bind(this)
    this.getInvite()
  }

  submitInviteCode(inviteCode) {
    logger('submitInviteCode: ', inviteCode)
    this.props.cookies.set('id', inviteCode, {
      httpOnly: false,
      domain: hostname,
      path: '/',
      sameSite: 'none',
      secure: true,
      maxAge: 315569520
    })
    return this.setState(
      {
        id: inviteCode,
        updateCodeClicked: true
      },
      () => {
        return this.getInvite()
      }
    )
  }

  getUrl() {
    return this.state.backendUrl + '/' + this.state.id
  }

  getInvite() {
    if (IS_MOCK) {
      return setTimeout(() => {
        this.setState(MOCK)
      }, 100)
    }

    if (!this.state.id) {
      logger('No id, skipping')
      return
    }

    return request(this.getUrl(), {
      json: true
    })
      .then((data) => {
        const people = data.people
        const hotel = data.hotel
        const didRSVP = data.didRSVP
        const address = data.address
        const flags = data.flags
        const events = data.events
        const email = data.email

        const store = window.localStorage
        store.setItem(STORE_NAME, this.state.id)

        if (!IS_LOCAL) {
          // @ts-ignore
          window.FS.identify(`${this.state.id}--${Object.keys(people)[0]}`)
        }

        logger('XX setting invite', {
          people,
          hotel,
          didRSVP,
          address,
          flags,
          events,
          email
        })

        this.setState({
          people,
          hotel,
          didRSVP,
          address,
          flags,
          events,
          email,
          gotInvite: true,
          invite: JSON.parse(
            JSON.stringify({
              people,
              address,
              events,
              email
            })
          )
        })
      })
      .catch((err) => {
        window.onerror(err.message, err)
        logger(`XX get invite failed ${err.message}`, err.statusCode)
        if (err.statusCode === 404) {
          return this.setState({
            id: ''
          })
        }

        setTimeout(() => {
          return this.getInvite()
        }, 1000)
      })
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
        <Navbar collapseOnSelect expand="sm" sticky="top">
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
        <Names />
        <a href="/" name="events" className="spot">
          {''}
        </a>
        <Events
          submitInviteCode={this.submitInviteCode}
          logger={logger}
          id={this.state.id}
          gotInvite={this.state.gotInvite}
        />
        <a href="/" name="hotels" className="spot">
          {''}
        </a>
        <Hotels />
        <a href="/" name="todo" className="spot">
          {''}
        </a>
        <Activities />
        <a href="/" name="ourstory">
          {''}
        </a>
        {/* <Waypoint onPositionChange={this.handleEnterStage} /> */}
        <Story />
      </div>
    )
  }
}

export default withCookies(App)
