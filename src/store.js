import React, { Component } from 'react'
class Store extends Component {
  render() {

    if (!document.getElementById("zola-wjs")) {
      var s, a = document.getElementsByTagName("script")[0];
      s = document.createElement("script")
      s.id = "zola-wjs"
      s.async = !0
      s.src = "https://widget.zola.com/js/widget.js"
      a.parentNode.insertBefore(s, a)
    }

    return (
      <React.Fragment>
        <a id="registry" className="zola-registry-embed" href="www.zola.com/registry/nancyandanand" data-registry-key="nancyandanand">
          Our Zola Wedding Registry
        </a>
      </React.Fragment>
    )
  }
}

export default Store
