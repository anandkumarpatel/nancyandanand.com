import React from 'react'
// import plane from './img/plane.svg';

let Plane = props => (
  <svg
    style={{
      isolation: 'isolate',
    }}
    viewBox="0 0 28 12"
    {...props}
  >
    <defs>
      <clipPath id="prefix__a">
        <path d="M0 0h28v12H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#prefix__a)">
      <path d="M0 1c-1 0 0 2 2 2 3 1 4 2 3 3 0 2 3 6 5 6l1-2c1-3 1-3 7-2 5 2 6 2 8 0 2-1 2-2 0-2V3l-3 1-5 1c-2-1-2-1 1-2 6-3 7-3 2-2H0z" />
    </g>
  </svg>
)

// Plane = props => (
//   <img src={plane} className="detail plane" />
// )

export default Plane
