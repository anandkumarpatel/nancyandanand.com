import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class People extends Component {
  render() {
    var people = this.props.people || []
    var peopleList = Object.keys(this.props.people)
    var list = peopleList.map((name) => {
      return <div key={name} className="person">
        <Row>
          <Col sm="6">
            {name}
          </Col>
          <Col>
            <button className="bYes ask" onClick={this.props.click(name)} value="Yes" disabled={people[name].isAttending === "Yes"}>Yes</button>
          </Col>
          <Col>
            <button className="bNo ask" onClick={this.props.click(name)} value="No" disabled={people[name].isAttending === "No"}>No</button>
          </Col>
        </Row>
      </div>
    })

    if (!this.props.valid) {
      return null
    }

    if (this.props.valid && list.length === 0) {
      list = [(<div key="loadingrsvp">Loading your RSVP...</div>)]
    }

    return (
      <React.Fragment>
        {list}
      </ React.Fragment>
    )
  }
}

export default People
