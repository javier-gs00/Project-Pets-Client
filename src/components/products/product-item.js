import React from 'react'

const ProductItem = props => {
    let result = props.result
    return (
        <div className="product-container">
            {/* <a className="product-link" href={result.href} target="_blank"> */}
                <div className="product-image">
                    <img src={result.imageUrl} alt={'Sin Imagen :('}/>
                </div>
                <div className="product-data">
                    <div className="product-data-block">
                        <span className="product-name">{result.name}</span>
                    </div>
                    <div className="product-data-block">
                        <span className="product-store">{result.store}</span>
                    </div>
                    <div className="product-data-block">
                        <span className="product-price">{parsePrice(result.price)}</span>
                    </div>
                </div>
            {/* </a> */}
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

