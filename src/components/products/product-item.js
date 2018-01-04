import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = props => {
    let product = props.result
    return (
        <div className="product-container">
            <div className="product-image">
                <img src={product.imageUrl} alt={'Sin Imagen :('}/>
            </div>
            <div className="product-data">
                <div className="product-data-block">
                    {/* <span className="product-name">{product.name}</span> */}
                    <Link to={"/productos/" + product._id} className="product-name">{product.name}</Link>
                </div>
                <div className="product-data-block">
                    <span className="product-store">{product.store}</span>
                </div>
                <div className="product-data-block">
                    <span className="product-price">{parsePrice(product.price)}</span>
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

export default ProductItem

