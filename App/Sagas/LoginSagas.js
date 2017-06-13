import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, action) {
  const { username, password } = action
  const response = yield call(api.login, username, password)
  console.log(response)
  console.log("Worked")
  if (response.ok) {
  if (response.data.ok) {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(LoginActions.loginFailure(response.data.all_errors))
  }
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

// attempts to check token login
export function * checkLogin (api, action) {
  const { username, token } = action
  const response = yield call(api.checkLogin, username, token)
  if (response.ok) {
  if (response.data.ok) {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(response.data.data))
  } else {
    // dispatch failure
    yield put(LoginActions.logout())
  }
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}