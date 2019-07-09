import React from 'react'
// import plane from './img/plane.svg';

let Plane = props => (
  <svg
    style={{
      isolation: 'isolate',
    }}
    viewBox="0 0 240 260"
    {...props}
  >
    <path d="M113 15L98 49c-19 38-21 56-7 83 3 7 16 22 19 22 2 0 1-3-3-6-9-10-16-28-16-43 0-16 3-25 17-50l11-20c4-7 3-8 10 3 22 37 26 62 16 91-20 54-86 59-136 10l-9-8c-1 2 6 43 10 53a118 118 0 0 0 228-34l2-17c2-3-2-1-5 3a91 91 0 0 1-52 33c-11 2-37 1-43-1-6-3-6-1 0 2 22 10 58 8 78-4l7-4c2-2 1 5-3 17-31 107-184 99-205-11-2-8-2-8 9-2 24 12 57 16 77 10 42-11 63-63 47-114-5-14-29-62-31-62l-6 15z" />
  </svg>
)

// Plane = props => (
//   <img src={plane} className="detail plane" />
// )

export default Plane
