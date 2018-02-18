import { LOAD_PRODUCTS } from '../actions/action-types'

const initialState = { products: [] }

const products = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                ...state,
                products: [
                    ...action.products
                ]
            }
        default:
            return state
    }
}

export default products