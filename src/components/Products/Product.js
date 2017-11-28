import React from 'react';
import { Link } from 'react-router-dom'
import './products.css'

const Product = (props) => [
    <div>
    {props.results.length !== 0?
        <div className="filters-container">
            <div className="filter-container">
                <label>Precio</label>
                <button 
                    className="icon-filter">
                    <i className="fa fa-sort-amount-asc"></i>
                </button>
            </div>
            <div className="filter-container">
                <label>Tienda</label>
                <button 
                    className="icon-filter">
                    <i className="fa fa-sort-alpha-desc"></i>
                </button>
            </div>
        </div>
    :null}
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
                <a className="product-link" href={result.href} target="_blank">
                    <div key={result._id} className="product-container">
                        <div className="product-image">
                            <img src={result.image_href} alt="Royal Canin Maxi Adulto"/>
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
                </a>
            )
        })}
    </div>
    </div>
]

export default Product;