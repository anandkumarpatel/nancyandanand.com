import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Waypoint } from 'react-waypoint'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import './App.css'

import People from './people.js'
import Divider from './divider.js'
import Dance from './dance.js'
import Hotels from './hotels.js'
import Address from './address.js'
import Msg from './msg.js'
import Stars from './stars.js'
import Garnesh from './garnesh.js'
import Atl from './atl.js'
import April from './april.js'
import Star from './star.js'

import star from './img/star.svg'

const path = window && window.location && window.location.pathname
const request = require('request-promise')

const hostname = window && window.location && window.location.hostname
let bURL = 'https://nancyandanand.herokuapp.com'

let IS_MOCK = false
if (/^localhost/.test(hostname) && IS_MOCK) {
  bURL = `http://localhost:8080`
}



const MOCK = {
  "people": {
    // "anand": { "isAttending": "?" },
    // "nancy": { "isAttending": "?" },
    // "Niru": { "isAttending": "?" },
    // "Dhansukh": { "isAttending": "?" },
    // "people1": { "isAttending": "?" },
    // "people2": { "isAttending": "?" },
    // "people3": { "isAttending": "?" },
  },
  "hotel": {
    "rate": "0",
    "name": "GT"
  },
  "didRSVP": false,
  submitted: true,
  // address: {
  //   street: '860 peachtree street NE unit 1814',
  //   city: 'Atlanta',
  //   state: 'Georgia',
  //   zip: '30308',
  //   country: 'USA',
  // }
}

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props)
    const { cookies } = props

    const id = cookies.get('id') || null

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
        country: '',
      },
      didSubmit: false,
      submitClicked: false,
      backendUrl: `${bURL}/invite/${id}`
    }

    console.log("init state", this.state)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.click = this.click.bind(this)
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.addrChange = this.addrChange.bind(this)
    this.getInvite()
  }

  handlePositionChange(data) {
    if (data.currentPosition === 'above' && data.previousPosition === 'inside') {
      document.getElementById('App').classList.add('darken')
    }
    if (data.currentPosition === 'inside' && data.previousPosition === 'above') {
      document.getElementById('App').classList.remove('darken')
    }
  }

  getInvite() {
    if (!this.state.id) {
      return setTimeout(() => {
        document.getElementById('loading').classList.add("loading-finish")
      }, 100)
    }

    if (IS_MOCK) {
      return setTimeout(() => {
        this.setState(MOCK)
        document.getElementById('loading').classList.add("loading-finish")
      }, 100)
    }

    return request(this.state.backendUrl, {
      json: true
    })
      .then((data) => {
        document.getElementById('loading').classList.add("loading-finish")
        const people = data.people
        const hotel = data.hotel
        const didRSVP = data.didRSVP
        const address = data.address

        console.log("XX setting invite", {
          people,
          hotel,
          didRSVP,
          address
        }, data, typeof data)

        console.log('XX set cookie', this.state.id)

        this.setState({
          people,
          hotel,
          didRSVP,
          address
        })
      })
      .catch((err) => {
        document.getElementById('loading').classList.add("loading-finish")
        console.log(`get invite failed ${err.message}`)
        setTimeout(() => {
          return this.getInvite()
        }, 1000)
      })
  }

  addressIsValid() {
    return !(this.state.address.street === '' || this.state.address.city === '' || this.state.address.state === '' || this.state.address.zip === '' || this.state.address.country === '')
  }

  async handleSubmit() {
    this.state.submitClicked = true
    console.log("handleSubmit", this.state.people)
    console.log("handleSubmit", this.state.address)
    this.setState({
      submitClicked: true,
      didSubmit: true
    })
    if (this.anyYes() && !this.addressIsValid()) {
      console.log("invalid address")
      return
    }

    if (IS_MOCK) {
      return
    }

    try {
      await request.post(this.state.backendUrl, {
        json: {
          people: this.state.people,
          address: this.state.address,
        }
      })
    } catch (err) {
      console.log("XX Error submitting", err)
      setTimeout(() => {
        return this.handleSubmit()
      }, 1000)
    }
  }

  /**
   * @param {React.ReactText} name
   */
  click(name) {
    return (event) => {
      const update = this.state.people
      if (event.target.value === "Yes") {
        update[name] = {
          isAttending: "Yes"
        }
      } else if (event.target.value === "No") {
        update[name] = {
          isAttending: "No"
        }
      }
      this.setState({
        people: update
      })
      console.log("click", update)
    }
  }

  addrChange(field, val) {
    const update = this.state
    update.address[field] = val
    this.setState(update)
  }

  yesList() {
    return Object.keys(this.state.people).filter((name) => {
      return "Yes" === this.state.people[name].isAttending
    })
  }

  anyYes() {
    return this.yesList().length > 0
  }

  render() {
    const isSubmitDisabled = () => {
      return anyNoAnswer() || (this.anyYes() && !this.addressIsValid()) || this.state.submitClicked
    }

    const anyNoAnswer = () => {
      return Object.keys(this.state.people).some((name) => {
        return "?" === this.state.people[name].isAttending
      })
    }

    const getDrawerClass = () => {
      if (this.anyYes()) {
        return 'drawer drawer-show'
      }
      return 'drawer'
    }

    const getRsvpText = () => {
      if (anyNoAnswer()) {
        return "Please click Yes or No for all guests above"
      }

      if (this.anyYes() && !this.addressIsValid()) {
        return "Please enter mailing address"
      }

      return "Click to RSVP"
    }

    if (this.state.didSubmit) {
      window.scrollTo(0, 0)
      return (
        <div className="App" id="App">
          <Msg show={this.state.didSubmit} yesList={this.yesList()} />
        </div>
      )
    }

    return (
      <div className="App" id="App">

        <div className='star-drop' style={{ top: "1vh", left: "calc(1rem + 45px)", animationDelay: ".5s" }}>
          <div className='star-sway' style={{ animationDelay: "1.5s" }} >
            <Star src={star} className="star" />
          </div>
        </div>
        <div className='star-drop' style={{ top: "50vh", left: "calc(2rem + 45px)", animationDelay: "1.3s" }}>
          <div className='star-sway' style={{ animationDelay: "2.3s" }}>
            <Star src={star} className="star" />
          </div>
        </div>
        <div className='star-drop' style={{ top: "60vh", right: "calc(2rem + 90px)", animationDelay: ".1s" }}>
          <div className='star-sway' style={{ animationDelay: "1.1s" }}>
            <Star src={star} className="star" />
          </div>
        </div>
        <div className='star-drop' style={{ top: "5vh", right: "calc(1rem + 90px)", animationDelay: ".7s" }}>
          <div className='star-sway' style={{ animationDelay: "1.7s" }}>
            <Star src={star} className="star" />
          </div>
        </div>

        <div className="intro blue-font">
          <h1 className="cursive" > You Are  </h1>
          <h1 className="cursive" >Invited</h1>
          <h2> To Celebrate the Marriage of </h2>
        </div>
        <div className="us blue-font">
          <h1 className="cursive" > Nancy </h1>
          <h2> & </h2>
          <h1 className="cursive" >Anand </h1>
        </div>
        <Divider className="divider" />
        <div className="cItem date">
          <April className="detail april" />
          <h1> April 4th 2020 </h1>
        </div>
        <Divider className="divider" />
        <div className="cItem location">
          <Atl className="detail atl" />
          <h1> Atlanta, GA </h1>
        </div>
        <Divider className="divider" />
        <div className="cItem">
          <Waypoint onPositionChange={this.handlePositionChange} />
          <Garnesh className="detail garnesh" />
          <h1> Wedding </h1>
          <p> Piedmont Room at Park Tavern </p>
        </div>
        <Divider className="divider" />
        <div className="star-bottom">
          <Stars />
          <div className="cItem">
            <Dance className="detail dance" />
            <h1> Reception </h1>
            <p> Egyptian ballroom at Fox Theater </p>
          </div>
          <Divider className="divider" />
          <div className="cItem fox">
            <h1 className="gold-text cursive"> R.S.V.P. </h1>
            <People people={this.state.people} click={this.click} />
          </div>
          <br />
          <div className={getDrawerClass()}>
            <Address address={this.state.address} change={this.addrChange} ></Address>
            <Hotels info={this.state.hotel}></Hotels>
          </div>
          <Row className={Object.keys(this.state.people).length !== 0 ? "rsvp-button" : 'rsvp-button hidden'}>
            <Col>
              <Button size="lg" value="RSVP" onClick={this.handleSubmit} disabled={isSubmitDisabled()}>{getRsvpText()}</Button>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}

export default withCookies(App)
