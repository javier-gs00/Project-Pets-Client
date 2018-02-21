import { ADD_PRODUCTS,
    START_ROTATING_SPINNER,
    STOP_ROTATING_SPINNER,
    HANDLE_INPUT_TEXT_CHANGE,
    HANDLE_FILTER_CHANGE,
    HANDLE_ACTIVE_PAGE_CHANGE, 
    REMOVE_PRODUCTS} from '../actions/action-types'

const initialState = {
    pathname: '/productos',
    products: [],
    isLoading: false,
    activePage: 1,
    searchValue: "",
    filters: []
}

const products = (state = initialState, action) => {
    switch (action.type) {
        case START_ROTATING_SPINNER:
            return {
                ...state,
                isLoading: true
            }
        case STOP_ROTATING_SPINNER:
            return {
                ...state,
                isLoading: false
            }
        case HANDLE_INPUT_TEXT_CHANGE:
            return {
                ...state,
                searchValue: action.text
            }
        case ADD_PRODUCTS:
            return {
                ...state,
                pathname: action.pathname,
                searchValue: action.searchValue,
                products: action.products,
                activePage: 1,
                isLoading: false,
                filters: action.filters
            }
        case REMOVE_PRODUCTS:
            return {
                ...state,
                activePage: 1,
                products: [],
                filters: []
            }
        case HANDLE_FILTER_CHANGE:
            return {
                ...state,
                activePage: 1,
                filters: state.filters.map(filter => filter.id === action.id
                    ? { ...filter, checked: !filter.checked }
                    : filter)
            }
        case HANDLE_ACTIVE_PAGE_CHANGE:
            return {
                ...state,
                activePage: action.pageNumber
            }
        default:
            return state
    }
}

export default products