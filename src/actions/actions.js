import * as types from './action-types'

// Redux Action Creators
// load the products to the redux store
export const loadProducts = (pathname, products, filters) => ({
    type: types.LOAD_PRODUCTS,
    pathname,
    products,
    filters
})

export const removeProducts = () => ({
    type: types.REMOVE_PRODUCTS
})

export const startRotatingSpinner = () => ({
    type: types.START_ROTATING_SPINNER
})

export const stopRotatingSpinner = () => ({
    type: types.STOP_ROTATING_SPINNER
})

export const handleInputTextChange = text => ({
    type: types.HANDLE_INPUT_TEXT_CHANGE,
    text
})

export const handleFilterChange = id => ({
    type: types.HANDLE_FILTER_CHANGE,
    id
})

export const handleActivePageChange = pageNumber => ({
    type: types.HANDLE_ACTIVE_PAGE_CHANGE,
    pageNumber
})