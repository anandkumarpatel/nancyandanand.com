import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Waypoint } from 'react-waypoint'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import './App.css'

import Address from './address.js'
import April from './april.js'
import Atl from './atl.js'
import Dance from './dance.js'
import Divider from './divider.js'
import Events from './events.js'
import Garnesh from './garnesh.js'
import Hotels from './hotels.js'
import Mehndi from './mehndi.js'
import Msg from './msg.js'
import People from './people.js'
import Pithi from './pithi.js'
import Star from './star.js'
import Stars from './stars.js'
import Welcome from './welcome.js'
import Beach from './beach.js'
import InviteCode from './invitecode.js'
import Email from './email.js'
import Plane from './plane.js'
import MM from './mm.js'
import GS from './gs.js'

import star from './img/star.svg'


const request = require('request-promise')

const hostname = window && window.location && window.location.hostname
let bURL = 'https://invite.nancyandanand.com'

const B_MOCK = true
let IS_MOCK = false
let IS_LOCAL = false
let logger = (...args) => { }

if (!hostname.includes("nancy") && B_MOCK) {
  bURL = `http://${hostname}:8080`
  IS_LOCAL = true
  logger = console.log
}

if (hostname === "nancyandanand.com") {
  IS_MOCK = false
  IS_LOCAL = false
}

const MOCK = {
  "people": {
    "anand": { "isAttending": "?" },
    "nancy": { "isAttending": "?" },
    "Niru": { "isAttending": "?" },
    "Dhansukh": { "isAttending": "?" },
    // "people1": { "isAttending": "?" },
    // "people2": { "isAttending": "?" },
    // "people3": { "isAttending": "?" },
  },
  "hotel": {
    "rate": "0",
    "name": "GT"
  },
  "didRSVP": false,
  gotInvite: true,
  submitted: true,
  flags: {
    afam: "Yes",
    // flight: "sfo".
    // boice: "Yes"
  },
  events: {
    pithi: "Yes",
    mehndi: "Yes"
  },
  email: "anand@gmail.com",
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

    let id = props.cookies.get('id') || null
    if (IS_MOCK) {
      id = 'helloId'
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
        country: '',
      },
      events: {},
      flags: {},
      email: '',
      submitClicked: false,
      updateCodeClicked: false,
      backendUrl: `${bURL}/invite`,
      gotInvite: false,
      invite: {},
    }

    logger("XX init state", this.state)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.attendOptionClick = this.attendOptionClick.bind(this)
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.eventChange = this.eventChange.bind(this)
    this.emailChange = this.emailChange.bind(this)
    this.addrChange = this.addrChange.bind(this)
    this.addrBlur = this.addrBlur.bind(this)
    this.submitInviteCode = this.submitInviteCode.bind(this)
    this.getInvite()
  }

  getUrl() {
    return this.state.backendUrl + '/' + this.state.id
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
    if (IS_MOCK) {
      return setTimeout(() => {
        this.setState(MOCK)
      }, 100)
    }

    if (!this.state.id) {
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

        if (!IS_LOCAL) {
          // @ts-ignore
          window.FS.identify(`${this.state.id}--${Object.keys(people)[0]}`)
        }

        logger("XX setting invite", {
          people,
          hotel,
          didRSVP,
          address,
          flags,
          events,
          email,
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
          invite: JSON.parse(JSON.stringify({
            people,
            address,
            events,
            email,
          }))
        }, () => {
          if (this.state.updateCodeClicked) {
            window.scrollTo(0, document.body.clientHeight)
          }
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

  rsvpChanged() {
    return !this.isEquivalent(this.state.invite, {
      people: this.state.people,
      address: this.state.address,
      events: this.state.events,
      email: this.state.email,
    })
  }

  isEquivalent(a, b) {
    var aProps = Object.keys(a);
    var bProps = Object.keys(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (typeof a[propName] === "object") {
        if (!this.isEquivalent(a[propName], b[propName])) {
          return false
        }
        continue
      }

      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }

  addressIsValid() {
    return !(this.state.address.street === '' || this.state.address.city === '' || this.state.address.state === '' || this.state.address.zip === '' || this.state.address.country === '')
  }

  async handlePatch(data) {
    logger("XX handlePatch", data)
    try {
      await this.post(data)
    } catch (err) {
      logger("ignore post err", err)
    }
  }

  async post(data) {
    try {
      await request.post(this.getUrl(), {
        json: data
      })
    } catch (err) {
      logger("XX Error posting", err)
      window.onerror(err.message, err)
      throw err
    }
  }

  async handleSubmit() {
    this.state.submitClicked = true
    logger("XX handleSubmit", this.state.people)
    logger("XX handleSubmit", this.state.address)
    logger("XX handleSubmit", this.state.email)
    logger("XX handleSubmit", this.state.events)

    this.setState({
      submitClicked: true,
    })

    if (this.anyYes() && !this.addressIsValid()) {
      logger("XX invalid address")
      return
    }

    if (IS_MOCK) {
      return
    }

    try {
      await this.post({
        people: this.state.people,
        address: this.state.address,
        events: this.state.events,
        email: this.state.email,
      })
    } catch (err) {
      setTimeout(() => {
        return this.handleSubmit()
      }, 1000)
    }
  }

  /**
   * @param {React.ReactText} name
   */
  attendOptionClick(name) {
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

      const peopleUpdate = {
        people: update
      }

      this.setState(peopleUpdate)
      this.handlePatch(peopleUpdate)
      logger("XX attendOptionClick", update)
    }
  }

  submitInviteCode(inviteCode) {
    logger("submitInviteCode: ", inviteCode)
    this.props.cookies.set("id", inviteCode)
    return this.setState({
      id: inviteCode,
      updateCodeClicked: true
    }, () => {
      return this.getInvite()
    })
  }

  addrBlur(event) {
    logger("XX addr blur", this.state.address)
    if (this.addressIsValid()) {
      this.handlePatch({
        address: this.state.address
      })
    }
  }

  addrChange(event) {
    const field = event.target.name
    const val = event.target.value
    logger("XX addr change", field, val)
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

  getMehndi() {
    if (!this.state.events.mehndi) {
      return null
    }

    // Nancy info
    let date = "April 2ed"
    let location = "Saha Household"
    if (this.state.flags.afam) {
      // Anands info
      date = "April 1st"
      location = "Patel Household"
    }

    return (
      <React.Fragment>
        <Divider className="divider" />
        <div className="cItem">
          <div className="info-hold">
            <Mehndi className="detail mehndi" />
            <h1> Mehndi Night </h1>
            <p> {date} </p>
            <p> {location}</p>
          </div>
        </div>
      </React.Fragment>
    )
  }

  getMM() {
    if (!this.state.events.mm) {
      return null
    }

    return (
      <React.Fragment>
        <Divider className="divider" />
        <div className="cItem">
          <div className="info-hold">
            <MM className="detail" />
            <h1> Mandap Muhurat </h1>
            <p> Morning of April 2nd </p>
            <p> Patel House </p>
          </div>
        </div>
      </React.Fragment>
    )
  }

  getGS() {
    if (!this.state.events.gs) {
      return null
    }

    return (
      <React.Fragment>
        <Divider className="divider" />
        <div className="cItem">
          <div className="info-hold">
            <GS className="detail" />
            <h1> Grah Shanti </h1>
            <p> Night of April 2nd </p>
            <p> Mandir </p>
          </div>
        </div>
      </React.Fragment>
    )
  }

  getPithi() {
    if (!this.state.events.pithi) {
      return null
    }

    // Nancy info
    let date = "April 3rd"
    let location = "Thakkar Household"
    let event = "Pithi"

    return (
      <React.Fragment>
        <Divider className="divider" />
        <div className="cItem">
          <div className="info-hold">
            <Pithi className="detail pithi" />
            <h1> {event} </h1>
            <p> {date} </p>
            <p> {location} </p>
          </div>
        </div>
      </React.Fragment>
    )
  }

  eventChange(event) {
    return (e) => {
      const update = {
        events: this.state.events
      }
      update.events[event] = e.target.value
      this.setState(update)
      this.handlePatch({
        events: update.events
      })
      logger("XX eventChange", update)
    }
  }

  emailChange(e) {
    const update = {
      email: e.target.value
    }
    this.setState(update)
    logger("XX eventChange", update)
  }

  anyMissingEvent() {
    return Object.keys(this.state.events).some((name) => {
      return "?" === this.state.events[name]
    })
  }



  getRSVPButton() {
    if (!this.state.gotInvite) {
      return null
    }

    const anyMissingAnswer = () => {
      return Object.keys(this.state.people).some((name) => {
        return "?" === this.state.people[name].isAttending
      })
    }

    const emailIsValid = () => {
      if (this.state.invite.email !== '') {
        return true
      }
      return this.state.email !== '' && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.state.email)
    }

    const isSubmitDisabled = () => {
      return !this.state.gotInvite || anyMissingAnswer() || (this.anyYes() && (!this.addressIsValid() || this.anyMissingEvent() || !emailIsValid())) || this.state.submitClicked || (this.state.didRSVP && !this.rsvpChanged())
    }


    const getRsvpText = () => {
      if (!this.state.gotInvite) {
        return ''
      }

      if (anyMissingAnswer()) {
        return "Please click Yes or No for all guests above"
      }

      if (this.anyYes()) {
        if (!this.addressIsValid()) {
          return "Please enter mailing address above"
        }
        if (this.anyMissingEvent()) {
          return "Please click Yes or No for all events above"
        }

        if (this.state.invite.email === '') {
          if (this.state.email === '') {
            return "Please enter email above"
          }
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.state.email)) {
            return "Please valid email above"
          }
        }
      }


      if (this.state.didRSVP) {
        if (this.rsvpChanged()) {
          return "Click to update RSVP"
        } else {
          return "RSVP Confirmed"
        }
      }

      return "Click to RSVP"
    }

    return (
      <div className="rsvp rsvp-button">
        <div className="info-hold">
          <Button size="lg" value="RSVP" onClick={this.handleSubmit} disabled={isSubmitDisabled()}>{getRsvpText()}</Button>
        </div>
      </div>
    )
  }

  getAtlanta() {
    return (
      <React.Fragment>
        <Divider className="divider" />
        <div className="cItem location">
          <div className="info-hold">
            <div className="detail fly-path">
              <Plane className="plane" />
            </div>
            <Atl className="detail atl" />
            <h1> Atlanta, GA </h1>
          </div>
        </div>
      </React.Fragment>
    )
  }

  getPcb() {
    if (!(this.state.events.mehndi || this.state.events.mm || this.state.events.gs)) {
      return null
    }

    return (
      <React.Fragment>
        <Divider className="divider" />
        <div className="cItem location">
          <div className="info-hold">
            <Beach className="detail beach" />
            <h1> Panama City Beach </h1>
          </div>
        </div>
      </React.Fragment>
    )
  }

  getNancy() {
    return (
      <React.Fragment>
        {this.getAtlanta()}
        {this.getMehndi()}
        {this.getPithi()}
      </React.Fragment>
    )
  }

  getAnand() {
    return (
      <React.Fragment>
        {this.getPcb()}
        {this.getMehndi()}
        {this.getMM()}
        {this.getGS()}
        {this.getAtlanta()}
      </React.Fragment>
    )
  }

  getPreEvents() {
    if (this.state.flags.nfam) {
      return this.getNancy()
    }

    if (this.state.flags.afam) {
      return this.getAnand()
    }

    return this.getAtlanta()
  }

  getNames() {
    const first = this.state.flags.afam ? "Anand" : "Nancy"
    const sec = this.state.flags.afam ? "Nancy" : "Anand"

    return (
      <div className="intro blue-font">
        <div className="info-hold us">
          <h1 className="cursive" >{first}</h1>
          <p> & </p>
          <h1 className="cursive" >{sec}</h1>
        </div>
      </div>
    )
  }

  render() {
    const getDrawerClass = () => {
      if (this.anyYes()) {
        return 'drawer drawer-show'
      }
      return 'drawer'
    }

    if (this.state.submitClicked) {
      window.scrollTo(0, 0)
      return (
        <div className="App" id="App">
          <Msg show={this.state.submitClicked} yesList={this.yesList()} />
        </div>
      )
    }

    return (
      <div className="App" id="App" >
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
          <div className="info-hold">
            <h1 className="cursive" > You Are  </h1>
            <h1 className="cursive" >Invited</h1>
            <p> To Celebrate the Marriage of </p>
          </div>
        </div>
        {this.getNames()}

        {this.getPreEvents()}

        <Divider className="divider" />
        <div className="cItem date">
          <div className="info-hold">
            <Welcome className="detail welcome" />
            <h1> Welcome Dinner </h1>
            <p> April 3rd </p>
          </div>
        </div>
        <Divider className="divider" />
        <div className="cItem date">
          <div className="info-hold">
            <April className="detail april" />
            <h1> April 4th 2020 </h1>
          </div>
        </div>
        <Divider className="divider" />
        <div className="cItem">
          <Waypoint onPositionChange={this.handlePositionChange} />
          <div className="info-hold">
            <Garnesh className="detail garnesh" />
            <h1> Wedding </h1>
            <p> Piedmont Room at Park Tavern </p>
          </div>
        </div>
        <Divider className="divider" />
        <div className="star-bottom">
          <Stars />
          <div className="cItem">
            <div className="info-hold">
              <Dance className="detail dance" />
              <h1> Reception </h1>
              <p> Egyptian ballroom at Fox Theater </p>
            </div>
          </div>
          <Divider className="divider" />
          <div className="cItem fox">
            <h1 className="gold-text cursive"> R.S.V.P. </h1>
            <div className="fox-outer">
              <div className="fox-neon">
                <div className="names">
                  <People valid={!!this.state.id} people={this.state.people} click={this.attendOptionClick} />
                  <InviteCode valid={!this.state.id} handle={this.submitInviteCode} />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className={getDrawerClass()}>
            <Address address={this.state.address} change={this.addrChange} blur={this.addrBlur} />
            <Events events={this.state.events} click={this.eventChange} />
            <Email inviteEmail={this.state.invite.email} email={this.state.email} change={this.emailChange} />
            <Hotels flags={this.state.flags} info={this.state.hotel} />
          </div>
          {this.getRSVPButton()}
        </div>
      </div >
    )
  }
}

export default withCookies(App)
