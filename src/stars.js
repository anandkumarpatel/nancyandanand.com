import React, { Component } from 'react'
import Image from 'react-bootstrap/Image';
import './stars.css';

const image = require('./img/silver-star.png')
const NUM_SQUARE = 5
const starSize = 45

class Stars extends Component {
  constructor(props) {
    super(props)
    const stars = []
    for (let i = 0; i < NUM_SQUARE; i++) {
      for (let j = 0; j < NUM_SQUARE; j++) {
        const blockSize = 100 / NUM_SQUARE

        const ox = this.constrainX(Math.floor(Math.random() * blockSize + i * blockSize))
        const oy = Math.floor(Math.random() * blockSize + j * blockSize);
        const atime = Math.floor(Math.random() * 5 + 3);
        stars.push({
          ox, oy, atime
        })
      }
    }

    this.state = {
      stars
    }
  }

  constrainX(x) {
    const min = 100 - Math.ceil(starSize / (document.body.offsetWidth / 100))
    if (x > min) {
      return min
    }
    return x
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
            left: `${star.ox}%`,
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
