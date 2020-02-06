const hostname = window && window.location && window.location.hostname
let defaultUrl = window && window.location && window.location.origin

if (hostname.includes('localhost')) {
  defaultUrl = `http://localhost:8080`
}

export default defaultUrl
