import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { parsePrice } from '../../utils'

const ProductItem = ({ product, path }) => (
    <div className="product-item-container">
        <div className="product-item-image">
            <Link to={{
                    // pathname: `/productos/resultados/${product._id}`,
                    pathname: `${path}/${product._id}`,
                    state: { product: product }}}>
                <img src={product.imageUrl} alt="Producto sin imagen"/>
            </Link>
        </div>
        <div className="product-item-data">
            <div className="product-item-data-block">
                <Link to={{
                    pathname: `${path}/${product._id}`,
                    state: { product: product }}}
                    className="product-item-name">{product.name}</Link>
            </div>
            <div className="product-item-data-block">
                <span className="product-item-store">{product.store}</span>
            </div>
            <div className="product-item-data-block">
                <span className="product-item-price">{parsePrice(product.price)}</span>
            </div>
        </div>
    </div>     
)

ProductItem.propTypes = {
    product: PropTypes.object
}

export default ProductItem

