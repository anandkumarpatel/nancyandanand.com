import React, { Component } from 'react'
// import YouTube from 'react-youtube'
// import Hero from './curtain.js'

const curtains = require('./img/curtain-1.jpg')

class Story extends Component {
  render() {
    return (
      <div className="story">
        <div className="story-stage"></div>
        <div className="story-main">
          {/* <h1 className="story-intro">Our Story</h1> */}
          <div className="story-image">
            <img alt="curtains" className="story-curtain" src={curtains} />
            <div className="bottom-text">
              <h1>Coming Soon</h1>
            </div>
            {/* <Hero /> */}
            {/* <YouTube
                videoId="FTLKdAU4XJM?controls=0"
                opts={vidOps}
                onReady={_onReady}
                lassName="story-video"
              /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Story
