import { select, put } from 'redux-saga/effects'
import { selectTorrents, startup } from '../../App/Sagas/StartupSagas'
import NyaaActions from '../../App/Redux/NyaaRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watches for the right action', () => {
  const step = stepper(startup())
  NyaaActions.torrentRequest('', '', '', '')
  expect(step()).toEqual(select(selectTorrents))
  expect(step()).toEqual(put(NyaaActions.torrentRequest('', '', '', '')))
})
