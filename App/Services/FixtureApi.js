export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
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
