import React from 'react';
import './products.css'

const Product = (props) => [
    <div className="products-container">
        {props.results.map(result => {
            // transform the price into a string and add a $ and a .
            
            let price = result.price.toString()
            if (price.length > 4) {
                price = "$" + price.slice(0, 2) + "." + price.slice(-3)
            } else {
                price = "$" + price.slice(0, 1) + "." + price.slice(-3)
            }

            return (
                <div key={result._id} className="product-container">
                    <div className="product-image">
                        <img src="img/royal_canin_maxi_adulto_400x400.jpg" alt="Royal Canin Maxi Adulto"/>
                    </div>
                    <div className="product-data">
                        <div className="product-data-block">
                            <span className="product-name">{result.name}</span>
                        </div>
                        <div className="product-data-block">
                            <span className="product-store">{result.store}</span>
                        </div>
                        <div className="product-data-block">
                            <span className="product-price">{price}</span>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
]

export default Product;