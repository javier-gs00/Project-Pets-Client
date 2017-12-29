import { GET_PRODUCTS } from '../actions/action-types'

const initialState = [
    {
        query: ''
    }
]

export default function products(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, query: action.query }
        default:
            return state
    }
}