const hostname = window && window.location && window.location.hostname
let defaultUrl = 'https://invite.nancyandanand.com'

if (hostname.includes('localhost')) {
  defaultUrl = `http://localhost:8080`
}

export default defaultUrl
