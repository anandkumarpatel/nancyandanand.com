import React, { Component } from 'react'

class Redone extends Component {
  render() {
    var msg = this.basic()
    if (this.props.isAttending) {
      msg = this.guest()
    }
    return (
      <div className="section white-marble">
        <div className="postpone">
          {msg}
        </div>
      </div>
    )
  }

  guest() {
    return (
      <div>
        Updates
        <br />
        <br />
          Mask Policy:
        <br />
          We are requesting all guests to wear masks when unable to maintain 6 feet distance from others outside your social bubble, particularly when inside.
        <br />
          We will have some available in case anyone forgets!
        <br />
        <br />
          The Wedding ceremony will be outdoors on a grassy meadow.
        <br />
          The Reception dance party will take place on an outdoor terrace.
        <br />
        <br />
          If you have any questions, feel free to reach out to us!
        <br />
        <br />
          Stay healthy,
        <br />
          Nancy & Anand
      </div>
    )
  }

  basic() {
    return (
      <div>
        Dear loved ones,
        <br />
        <br />
            We have rescheduled our wedding to April 10th 2021
        <br />
            However due to the pandemic, we have made some changes to ensure the safety of our guests.
        <br />
        <br />
            While we wish we could celebrate with everyone, we have reduced the guest list.
        <br />
            We request guests get vaccinated or tested before attending the events.
        <br />
            We will be livestreaming the wedding events for anyone who cant make it.
        <br />
            We will share the livestream details soon.
        <br />
        <br />
            If you have any questions, feel free to reach out to us!
        <br />
        <br />
            Stay healthy,
        <br />
            Nancy & Anand
      </div>
    )
  }
}

export default Redone
