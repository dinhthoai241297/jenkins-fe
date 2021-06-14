import { combineReducers } from 'redux'
import appCommon from './appCommon'
import account from './account'
import area from './area'
import aboutUs from './aboutUs'

const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    area: area.reducer,
    aboutUs: aboutUs.reducer,
})

export default rootReducer
