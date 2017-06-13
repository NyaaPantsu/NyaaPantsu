export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/torrents.json')
    }
  },
  login: (username, password) => {
    return {
      ok: true,
      data: require('../Fixtures/user.json')
    }
  },
  checkLogin: (username, token) => {
    return {
      ok: true,
      data: require('../Fixtures/user.json')
    }
  },
  getTorrents: (title, category, max, status) => {
    // This fixture only supports gantman or else returns skellock
    const torrentsData = require('../Fixtures/torrents.json')
    return {
      ok: true,
      data: torrentsData
    }
  },
  getTorrent: (id) => {
    // This fixture only supports gantman or else returns skellock
    const torrentsData = require('../Fixtures/torrents.json')
    return {
      ok: true,
      data: torrentsData[0]
    }
  }
}
