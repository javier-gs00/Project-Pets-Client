import * as types from './action-types'

// Actions creators for Products
export const addProducts = (pathname, searchValue, products, filters) => ({
    type: types.ADD_PRODUCTS,
    pathname,
    searchValue,
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

export const handleSortByPrice = order => ({
    type: types.HANDLE_SORT_BY_PRICE,
    order
})

// Actions creators for Stores
export const addStores = stores => ({
    type: types.ADD_STORES,
    stores
})

// Actions creators for categories products
export const addCategoriesProducts = (pathname, products, filters) => ({
    type: types.ADD_CATEGORIES_PRODUCTS,
    pathname,
    products,
    filters
})

export const startCategoriesRotatingSpinner = () => ({
    type: types.START_CATEGORIES_ROTATING_SPINNER
})

export const stopCategoriesRotatingSpinner = () => ({
    type: types.STOP_CATEGORIES_ROTATING_SPINNER
})

export const handleCategoriesFilterChange = id => ({
    type: types.HANDLE_CATEGORIES_FILTER_CHANGE,
    id
})

export const handleCategoriesActivePageChange = pageNumber => ({
    type: types.HANDLE_CATEGORIES_ACTIVE_PAGE_CHANGE,
    pageNumber
})

export const handleCategoriesSortByPrice = order => ({
    type: types.HANDLE_CATEGORIES_SORT_BY_PRICE,
    order
})