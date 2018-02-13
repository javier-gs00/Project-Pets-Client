import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductItem = props => {
    let product = props.result
    return (
        <div className="product-item-container">
            <div className="product-item-image">
                <Link to={{
                        pathname: `/productos/${product._id}`,
                        state: { product: product }}}>
                    <img src={product.imageUrl} alt="Producto sin imagen"/>
                </Link>
            </div>
            <div className="product-item-data">
                <div className="product-item-data-block">
                    <Link to={{
                        pathname: `/productos/${product._id}`,
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
}

function parsePrice(intPrice) {
    let price = intPrice.toString()
    if (price.length > 5) {
        price = "$" + price.slice(0, 3) + "." + price.slice(-3)
    } else if (price.length > 4) {
        price = "$" + price.slice(0, 2) + "." + price.slice(-3)
    } else {
        price = "$" + price.slice(0, 1) + "." + price.slice(-3)
    }
    return price
}

ProductItem.propTypes = {
    result: PropTypes.object
}

export default ProductItem

