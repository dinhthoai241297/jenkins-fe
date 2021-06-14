import {
    actions as appCommonActions,
    actionTypes as appCommonTypes,
} from './appCommon'
import {
    actions as accountActions,
    actionTypes as accountTypes,
} from './account'

import {
    actions as aboutUsActions,
    actionTypes as aboutUsTypes,
} from './aboutUs'

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...aboutUsActions,
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...aboutUsTypes,
}
