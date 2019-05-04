import React, { Component } from 'react'
import Image from 'react-bootstrap/Image';
import './stars.css';

const image = require('./img/silver-star.png')
const NUM_STARS = 25

class Stars extends Component {
  constructor(props) {
    super(props)
    const stars = []
    for (let i = 0; i < NUM_STARS; i++) {
      const ox = Math.floor(Math.random() * 90);
      const oy = Math.floor(Math.random() * 80 + 5);
      const atime = Math.floor(Math.random() * 5 + 3);
      stars.push({
        ox, oy, atime
      })
    }

    this.state = {
      stars
    }
  }

  render() {
    // const rand = (e) => {
    //   const i = parseInt(e.target.name)
    //   // console.log("XX called", i)
    //   const stars = this.state.stars
    //   stars[i] = {
    //     ox: stars[i].ox, // Math.floor(Math.random() * 90 + 5),
    //     oy: stars[i].oy, // Math.floor(Math.random() * 90 + 5),
    //     atime: Math.floor(Math.random() * 5 + 2),
    //   }
    //   console.log("XX rand", i, stars[i])
    //   this.setState({
    //     stars
    //   })
    // }

    const list = this.state.stars.map((star, i) => {
      return (
        <Image
          key={i}
          name={i}
          className="starimg"
          src={image}
          style={{
            left: `calc(${star.ox}% - 45px)`,
            bottom: `${star.oy}%`,
            animation: `twinkle ${star.atime}s ease-in-out infinite`,
          }} />
      )
    })

    return (
      <div className="star-sky" >
        {list}
      </div>
    )
  }
}

export default Stars
