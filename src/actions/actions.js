import * as types from './action-types'

// Redux Action Creators
// load the products to the redux store
export const loadProducts = products => ({ type: types.LOAD_PRODUCTS, products })