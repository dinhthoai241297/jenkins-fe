import { call, takeLatest, takeEvery, put } from 'redux-saga/effects'

import { sendRequest } from '../services/apiService'
import { actionTypes, reduxUtil } from '../actions/aboutUs'
import { actions } from '../actions'
import apiConfig from '../constants/apiConfig'
import { removeStorageItem, setStringData } from '../utils/localStorageHelper'
import { StorageKeys } from '../constants'
import { ensureArray } from '../utils/helper'
import { handleApiResponse } from '../utils/apiHelper';

const { GET_CATEGORY_COMBOBOX, GET_LIST_NEWS, GET_BY_ID } = actionTypes
const DEFAULT_TABLE_ITEM_SIZE = 2;
const { defineActionSuccess } = reduxUtil

function* getCategoryCombobox({ payload: { onCompleted, onError } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.aboutUs.categoriesCombobox
        )
        if (success && responseData.result) {
            onCompleted && onCompleted(responseData.data?.data)
            yield put({
                type: defineActionSuccess(GET_CATEGORY_COMBOBOX),
                data: ensureArray(responseData.data?.data),
            })
        } else {
            onError && onError(responseData)
        }
    } catch (error) {
        onError && onError(error)
    }
}

function* getListNews({ payload: { params, onCompleted, onError } }) {
    try {

        const searchParams = {};
        if(params){
            if(params.size) searchParams.size = params.size;
            if(params.categoryId) searchParams.categoryId = params.categoryId;
            if(params.id) searchParams.id = params.id;
        }

        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.aboutUs.listNews,
            searchParams,
        )
        if (success && responseData.result) {
            let data = [];
            const totalElements = responseData.data?.totalElements;
            let numLoadMore = DEFAULT_TABLE_ITEM_SIZE;
            if(totalElements && totalElements > params.size){
                numLoadMore = totalElements - params.size > numLoadMore ? numLoadMore : totalElements - params.size;
            }
            else numLoadMore = -1;
            if(params.stack){
                if(params.action === "PUSH"){
                    data = [
                        ...params.stack,
                        {
                        ...responseData.data,
                        key: params.key,
                        size: params.size,
                        numLoadMore,
                        }
                    ];
                }
                else if(params.action === "POP"){
                    data = [
                        {
                            ...responseData.data,
                            key: params.key,
                            size: params.size,
                            numLoadMore,
                        },
                        ...params.stack,
                    ];
                }
            }
            else{
                data = [
                    {
                        ...responseData.data,
                        key: params.key,
                        size: params.size,
                        numLoadMore,
                    }
                ];
            }

            onCompleted && onCompleted({
                ...responseData.data,
                key: params.key,
                size: params.size,
                numLoadMore,
            });

            yield put({
                type: defineActionSuccess(GET_LIST_NEWS),
                data,
            })
        } else {
            onError && onError(responseData);
        }
    } catch (error) {
        onError && onError(error)
    }
}

function* getById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.aboutUs.getById,
            path: `${apiConfig.aboutUs.getById.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);

        if(success && responseData.result){
            onCompleted && onCompleted(responseData);

            let data = [];

            if(params.stack){
                if(params.action === "PUSH"){
                    data = [...params.stack, {...responseData.data, key: params.key}];
                }
                else if(params.action === "POP"){
                    data = [{...responseData.data, key: params.key}, ...params.stack];
                }
            }
            else{
                data = [{...responseData.data, key: params.key}];
            }

            yield put({
                type: defineActionSuccess(GET_LIST_NEWS),
                data,
            })
        } else{
            onError && onError(responseData);
        }
    } catch (error) {
        onError && onError(error)
    }
}

const sagas = [
    takeLatest(GET_CATEGORY_COMBOBOX, getCategoryCombobox),
    takeLatest(GET_LIST_NEWS, getListNews),
    takeLatest(GET_BY_ID, getById),
]

export default sagas
