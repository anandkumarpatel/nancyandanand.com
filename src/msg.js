import React, { Component } from 'react'

class Msg extends Component {
  render() {
    const attend = () => {
      const list = this.props.yesList
      if (list.length > 0) {
        return (
          <div>
            <p>We look forward to celebrating with you.</p>
            <p>Additional details will be sent out in your kankotri (invitation card).</p>
          </div>
        )
      }
    }

    const getState = () => {
      if (this.props.show) {
        return "msg show"
      }
      return "msg hide"
    }

    return (
      <div className={getState()}>
        <div className="msg-text">
          <h1>Thank You! </h1>
          {attend()}
          <p>If things change please update your RSVP by clicking on your invite link.</p>
          <p>Visit <a href='nancyandanand.com'> NancyAndAnand.com </a> to keep updated!</p>
        </div>
      </div>
    )
  }
}

export default Msg
