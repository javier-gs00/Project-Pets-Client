import { ADD_STORES } from '../actions/action-types'

const initialState = { stores: [] }

const stores = (state = initialState, action) => {
    switch(action.type) {
        case ADD_STORES:
            return { ...state, stores: action.stores }
        default:
            return state
    }
}

export default stores