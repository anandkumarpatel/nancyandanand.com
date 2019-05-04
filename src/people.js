import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class People extends Component {
  constructor(props) {
    super(props)

    this.state = {
      people: props.people
    }
  }

  getItemColor(name) {
    if (this.state.people[name].isAttending === "Yes") {
      return "person yes"
    }
    if (this.state.people[name].isAttending === "No") {
      return "person no"
    }
    return "person"
  }

  getButtonColor(type, name) {
    let out = type + " ask"
    if (this.state.people[name].isAttending === "Yes") {
      out += " yes"
    } else if (this.state.people[name].isAttending === "No") {
      out += " no"
    }
    return out
  }

  render() {
    var people = this.state.people || []
    var peopleList = Object.keys(this.state.people)
    var list = peopleList.map((name) => {
      return <div key={name} className={this.getItemColor(name)}>
        <Row>
          <Col sm="6">
            {name}
          </Col>
          <Col>
            <button className={this.getButtonColor("bYes", name)} onClick={this.props.click(name)} value="Yes" disabled={people[name].isAttending === "Yes"}>Yes</button>
          </Col>
          <Col>
            <button className={this.getButtonColor("bNo", name)} onClick={this.props.click(name)} value="No" disabled={people[name].isAttending === "No"}>No</button>
          </Col>
        </Row>
      </div>
    })

    return (
      <div className="fox-outer">
        <div className="fox-neon">
          <div className="names">
            {list}
          </div>
        </div>
      </div>
    )
  }
}

export default People
