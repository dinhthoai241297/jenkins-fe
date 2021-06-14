import { actionTypes, reduxUtil } from '../actions/aboutUs'

const initialState = {
    categoriesCombobox: [],
    listNewsStack: [],
}

const reducer = reduxUtil.createReducer(
    {
        [reduxUtil.defineActionSuccess(actionTypes.GET_LIST_NEWS)]: (
            state,
            { data }
        ) => {
            return {
                ...state,
                listNewsStack: data,
            }
        },
        [reduxUtil.defineActionSuccess(actionTypes.GET_CATEGORY_COMBOBOX)]: (
            state,
            { data }
        ) => {
            return {
                ...state,
                categoriesCombobox: data
            }
        },
    },
    initialState
)

export default {
    reducer,
}
