import { combineReducers } from 'redux'
import products from './product-reducer'
import stores from './store-reducer'

const projectPetsApp = combineReducers({
    products,
    stores
})

export default projectPetsApp