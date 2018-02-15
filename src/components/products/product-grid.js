import React from 'react'
import PropTypes from 'prop-types'
import ProductItem from './product-item'

const ProductGrid = ({ products }) => (                 
    <div className="products-grid-container">
        { products.map(product => <ProductItem key={product._id} product={product}/>) }
    </div>
)

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductGrid