import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('ABOUT_US')

const { defineAction, createAction } = reduxUtil

export const actionTypes = {
    GET_CATEGORY_COMBOBOX: defineAction('GET_CATEGORY_COMBOBOX'),
    GET_LIST_NEWS: defineAction('GET_LIST_NEWS'),
    GET_BY_ID: defineAction('GET_BY_ID'),
}

export const actions = {
    getCategoryCombobox: createAction(actionTypes.GET_CATEGORY_COMBOBOX),
    getListNews: createAction(actionTypes.GET_LIST_NEWS),
    getById: createAction(actionTypes.GET_BY_ID),
}
