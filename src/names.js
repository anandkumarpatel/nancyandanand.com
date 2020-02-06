import React, { Component } from 'react'
const flower = require('./img/right-png.png')

class Names extends Component {
  render() {
    return (
      <div className="section names pink">
        <div className="name-text">
          <img alt="" className="name-left" src={flower} />
          <h1>Nancy </h1>
          <h1>& </h1>
          <h1>Anand </h1>
          <h2>Are getting married</h2>
          <h2>April 4th 2020</h2>
          <img alt="" className="name-right" src={flower} />
        </div>
      </div>
    )
  }
}

export default Names
