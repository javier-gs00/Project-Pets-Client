import { 
    ADD_CATEGORIES_PRODUCTS,
    START_CATEGORIES_ROTATING_SPINNER,
    STOP_CATEGORIES_ROTATING_SPINNER,
    HANDLE_CATEGORIES_FILTER_CHANGE,
    HANDLE_CATEGORIES_SORT_BY_PRICE,
    HANDLE_CATEGORIES_ACTIVE_PAGE_CHANGE
} from '../actions/action-types'

const initialState = {
    pathname: '/categorias',
    products: [],
    isLoading: false,
    activePage: 1,
    filters: [],
    originalOrder: []
}

const categories = ( state = initialState, action ) => {
    switch(action.type) {
        case START_CATEGORIES_ROTATING_SPINNER:
            return {
                ...state,
                isLoading: true
            }
        case STOP_CATEGORIES_ROTATING_SPINNER:
            return {
                ...state,
                isLoading: false
            }
        case ADD_CATEGORIES_PRODUCTS:
            return {
                ...state,
                pathname: action.pathname,
                products: action.products,
                activePage: 1,
                isLoading: false,
                filters: action.filters,
                originalOrder: action.products.map(product => product._id)
            }
        case HANDLE_CATEGORIES_FILTER_CHANGE:
            return {
                ...state,
                activePage: 1,
                filters: state.filters.map(filter => filter.id === action.id
                    ? { ...filter, checked: !filter.checked }
                    : filter)
            }
        case HANDLE_CATEGORIES_ACTIVE_PAGE_CHANGE:
            return {
                ...state,
                activePage: action.pageNumber === '&gt;'
                    ? state.activePage + 1
                    : action.pageNumber === '&lt;'
                    ? state.activePage - 1
                    : parseInt(action.pageNumber, 10)
            }
        case HANDLE_CATEGORIES_SORT_BY_PRICE:
            return {
                ...state,
                activePage: 1,
                products: action.order === 'asc'
                    ? state.products.slice().sort((a, b) => b.price - a.price)
                    : action.order === 'desc'
                    ? state.products.slice().sort((a, b) => a.price - b.price)
                    : state.products.slice().sort((a, b) => state.originalOrder.indexOf(a._id) > state.originalOrder.indexOf(b._id) ? 1 : -1)
            }
        default:
            return state
    }
}

export default categories