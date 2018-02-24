import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductItem = ({ product }) => (
    <div className="product-item-container">
        <div className="product-item-image">
            <Link to={{
                    pathname: `/productos/resultados/${product._id}`,
                    state: { product: product }}}>
                <img src={product.imageUrl} alt="Producto sin imagen"/>
            </Link>
        </div>
        <div className="product-item-data">
            <div className="product-item-data-block">
                <Link to={{
                    pathname: `/productos/resultados/${product._id}`,
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

function parsePrice(intPrice) {
    let price = intPrice.toString()
    if (price.length > 6) {
        price = "$" + price.slice(0, 1) + "." + price.slice(1, 4) + "." + price.slice(-3)
    } else if (price.length > 5) {
        price = "$" + price.slice(0, 3) + "." + price.slice(-3)
    } else if (price.length > 4) {
        price = "$" + price.slice(0, 2) + "." + price.slice(-3)
    } else if (price.length > 3) {
        price = "$" + price.slice(0, 1) + "." + price.slice(-3)
    } else {
        price = "$" + price
    }
    return price
}

ProductItem.propTypes = {
    product: PropTypes.object
}

export default ProductItem

