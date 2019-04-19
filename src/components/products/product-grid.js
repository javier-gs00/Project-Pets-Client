import React from 'react'
import PropTypes from 'prop-types'
import ProductItem from './product-item'
import './product-grid.scss'

const ProductGrid = ({ products, path }) => (
  <div className="products-grid-container">
    {products.map(product => (
      <ProductItem key={product._id} product={product} path={path} />
    ))}
  </div>
)

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
}

export default ProductGrid
