import { all } from 'redux-saga/effects'
import appCommon from './appCommon'
import account from './account'
import area from './area'
import aboutUs from './aboutUs'

const sagas = [
    ...appCommon, 
    ...account, 
    ...area,
    ...aboutUs,
]

function* rootSaga() {
    yield all(sagas)
}

export default rootSaga
