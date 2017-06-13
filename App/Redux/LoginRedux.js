import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  checkLoginRequest: ['username', 'token'],
  loginSuccess: ['user'],
  loginFailure: ['error'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  username: null,
  token: null,
  password: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state, { username, password }) => state.merge({ fetching: true, username })

export const checkRequest = (state, { username, token }) => state.merge({ fetching: true, username, token })
// we've successfully logged in or checked token
export const success = (state, { user }) =>
  state.merge({ fetching: false, error: null, user, password: null, token: null })

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error, password: null, token: null })

// we've logged out
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.CHECK_LOGIN_REQUEST]: checkRequest,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.user !== null
