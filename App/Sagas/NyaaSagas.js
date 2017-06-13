import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import NyaaActions from '../Redux/NyaaRedux'

export function * getTorrents (api, action) {
  const { title, category, max, status } = action
  // make the call to the api
  const response = yield call(api.getTorrents, title, category, max, status)

  if (response.ok) {
    const torrents = path(['data'], response)
    // do data conversion here if needed
    yield put(NyaaActions.torrentSuccess(torrents))
  } else {
    yield put(NyaaActions.torrentFailure())
  }
}

export function * getTorrent (api, action) {
  const { id } = action
  // make the call to the api
  const response = yield call(api.getTorrent, id)

  if (response.ok) {
    const torrent = path(['data'], response)
    // do data conversion here if needed
    yield put(NyaaActions.torrentViewSuccess(torrent))
  } else {
    yield put(NyaaActions.torrentViewFailure())
  }
}
