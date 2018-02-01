import React from 'react'
import PropTypes from 'prop-types'
import Client from '../../api'

class ProductView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: ''
        }
    }

    componentDidMount() {
        const { location, match } = this.props
        this.props.getActiveRoute("/" + location.pathname.split("/")[1])

        return Client.findOne(match.params.id, product => {
            return this.setState({
                product: product
            })
        })
    }

    render() {
        const { product } = this.state
        console.log('...loading')
        console.log(this.state.product)
        console.log(typeof product.price)

        return (
            this.state.product 
            ? <div className="products-container">
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
                            <span className="product-price">{parsePrice(product.price)}</span>
                        </div>
                        <div className="product-data-block">
                            <a>IR</a><a>VOLVER</a>
                        </div>
                    </div>
                </div>            
            </div>
            : null
        )
    }
}

ProductView.propTypes = {
    getActiveRoute: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
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