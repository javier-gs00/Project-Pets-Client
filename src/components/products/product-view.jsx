import React from 'react'
import Client from '../../api'

class ProductView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            product: {}
        }
    }

    componentDidMount() {
        console.log(this.state.id)
        Client.findOne(this.state.id, product => {
            product.price = parsePrice(product.price)
            this.setState({ product: product })
        })
    }

    render() {
        const product = this.state.product

        return (
            <div className="products-container">
                <div className="product-container">
                    <div className="product-image">
                        <img src={product.imageUrl} alt={'Sin Imagen :('}/>
                    </div>
                    <div className="product-data">
                        <div className="product-data-block">
                            <span className="product-name">{product.name}</span>
                        </div>
                        <div className="product-data-block">
                            <span className="product-store">{product.store}</span>
                        </div>
                        <div className="product-data-block">
                            <span className="product-price">{product.price}</span>
                        </div>
                        <div className="product-data-block">
                            <a>IR</a><a>VOLVER</a>
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}

export default ProductView

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