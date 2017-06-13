import API from '../../App/Services/Api'
import FixtureAPI from '../../App/Services/FixtureApi'
import R from 'ramda'

test('All fixtures map to actual API', () => {
  const fixtureKeys = R.keys(FixtureAPI).sort()
  const apiKeys = R.keys(API.create())

  const intersection = R.intersection(fixtureKeys, apiKeys).sort()

  // There is no difference between the intersection and all fixtures
  expect(R.equals(fixtureKeys, intersection)).toBe(true)
})

test('FixtureAPI login returns the right file', () => {
  const expectedFile = require('../../App/Fixtures/user.json')

  expect(FixtureAPI.login("test", "test")).toEqual({
    ok: true,
    data: expectedFile
  })
})

test('FixtureAPI checkLogin returns the right file for test', () => {
  const expectedFile = require('../../App/Fixtures/user.json')

  expect(FixtureAPI.checkLogin('test', "token")).toEqual({
    ok: true,
    data: expectedFile
  })
})

test('FixtureAPI getTorrents returns the right file for skellock as default', () => {
  const expectedFile = require('../../App/Fixtures/torrents.json')

  expect(FixtureAPI.getTorrents()).toEqual({
    ok: true,
    data: expectedFile
  })
})
