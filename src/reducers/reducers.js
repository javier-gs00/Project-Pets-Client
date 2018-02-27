import { combineReducers } from 'redux'
import products from './product-reducer'
import stores from './store-reducer'
import categories from './categories-product-reducer'

const projectPetsApp = combineReducers({
    products,
    stores,
    categories
})

export default projectPetsApp