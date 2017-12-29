import * as types from './action-types'

// Redux Action Creators
export const getProducts = query => ({ type: types.GET_PRODUCTS, query })
//export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})