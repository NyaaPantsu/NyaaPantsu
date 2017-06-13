import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  torrentRequest: ['title', 'category', 'max', 'status'],
  torrentSuccess: ['torrents'],
  torrentFailure: null,
  torrentViewRequest: null,
  torrentViewSuccess: ['torrent'],
  torrentViewFailure: null
})

export const NyaaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  title: null,
  category: null,
  max: null,
  status: null,
  torrent: null,
  torrents: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const request = (state, { title, category, max, status }) =>
  state.merge({ fetching: true, title, category, max, status, torrents: null })

// successful temperature lookup
export const success = (state, action) => {
  const { torrents } = action
  return state.merge({ fetching: false, error: null, torrents })
}

// failed to get the temperature
export const failure = (state) =>
  state.merge({ fetching: false, error: true, torrents: null })

// request the temperature for a city
export const requestView = (state) =>
  state.merge({ fetching: true, torrent: null })

// successful temperature lookup
export const successView = (state, action) => {
  const { torrent } = action
  return state.merge({ fetching: false, error: null, torrent })
}

// failed to get the temperature
export const failureView = (state) =>
  state.merge({ fetching: false, error: true, torrent: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TORRENT_REQUEST]: request,
  [Types.TORRENT_SUCCESS]: success,
  [Types.TORRENT_FAILURE]: failure,
  [Types.TORRENT_VIEW_REQUEST]: requestView,
  [Types.TORRENT_VIEW_SUCCESS]: successView,
  [Types.TORRENT_VIEW_FAILURE]: failureView
})
