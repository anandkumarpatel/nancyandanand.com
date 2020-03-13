import React, { Component } from 'react'
import YouTube from 'react-youtube'

const curtainsl = require('./img/curtain-l.jpg')
const curtainsr = require('./img/curtain-r.jpg')

class Story extends Component {
  constructor(s) {
    super(s)
    this.state = {
      isOpen: false,
      player: {}
    }

    this.clicked = this.clicked.bind(this)
    this.ready = this.ready.bind(this)
    this.end = this.end.bind(this)
  }

  clicked() {
    if (!this.state.player) {
      return setTimeout(() => {
        this.clicked()
      }, 500)
    }

    if (!this.state.isOpen) {
      document.getElementById('curtain-l').classList.add('story-curtain-lt')
      document.getElementById('curtain-r').classList.add('story-curtain-rt')
      document.getElementById('bottom-text').classList.add('hide')
      document.getElementById('nav').classList.add('hide')
      document.getElementById('top').classList.add('hide')
      document.getElementById('story-static').classList.remove('hide')
    }

    this.setState({
      isOpen: true
    })
    this.state.player.playVideo()
  }

  end() {
    this.state.player.stopVideo()
    setTimeout(() => {
      document.getElementById('curtain-l').classList.remove('story-curtain-lt')
      document.getElementById('curtain-r').classList.remove('story-curtain-rt')
      document.getElementById('bottom-text').classList.remove('hide')
      document.getElementById('nav').classList.remove('hide')
      document.getElementById('top').classList.remove('hide')
      document.getElementById('story-static').classList.add('hide')

      this.setState({
        isOpen: false
      })
    }, 1000)
  }

  render() {
    const vidOps = {
      playerVars: {
        autoplay: 0,
        controls: 1,
        cc_load_policy: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0
      }
    }

    return (
      <div className="story" onClick={this.clicked}>
        <div className="story-stage"></div>
        <div className="story-main">
          <div className="story-image">
            <YouTube
              videoId="3EL1V2pPnJQ?controls=0"
              opts={vidOps}
              onReady={this.ready}
              onEnd={this.end}
              className="story-video"
              containerClassName="story-video-warp"
            />
            <img
              id="curtain-l"
              alt="curtains"
              className="story-curtain story-curtain-l"
              src={curtainsl}
            />
            <img
              id="curtain-r"
              alt="curtains"
              className="story-curtain story-curtain-r"
              src={curtainsr}
            />
            <div id="bottom-text" className="bottom-text">
              <h1>Click to start</h1>
            </div>
            <div id="story-static" className="story-image-static hide" />
          </div>
        </div>
      </div>
    )
  }

  ready(event) {
    this.setState({
      player: event.target
    })
  }
}

export default Story
