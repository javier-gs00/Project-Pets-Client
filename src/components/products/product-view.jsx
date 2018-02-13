import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from '@fortawesome/react-fontawesome'
import Loading from './loading'
import { Link } from 'react-router-dom'
import Client from '../../api'

class ProductView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: '',
            store: ''
        }
    }

    componentDidMount() {
        const { location, match } = this.props
        this.props.getActiveRoute("/" + location.pathname.split("/")[1])

        if (location.state !== undefined) {
            console.log('received props from previous component')
            return Client.getStoreByName(location.state.product.store)
            .then(store => this.setState({ product: location.state.product, store: store }))
        } else {
            console.log('sent api request for product')
            let product, store
            return Client.findProductById(match.params.id)
            .then(response => {
                product = response
                return Client.getStoreByName(product.store)
            })
            .then(response => {
                store = response
                return this.setState({ product: product, store: store })
            })
        }
    }

    render() {
        const { product, store } = this.state

        if (product && store) {
            const productImage = <div className="single-product-img"><img src={product.imageUrl} alt={product.name}></img></div>
            const productName = <div className="single-product-name"><h1>{product.name}</h1></div>
            const productCategoryAndAnimal = (<div className="single-product-category">
                    <span>
                        {product.category.slice(0,1).toUpperCase() + product.category.slice(1)} para {product.animal}
                    </span>
                </div>)
            const productStore = (<div className="single-product-store">
                    <Link to={{
                        pathname: `/tiendas/${product.store}`,
                        state: { store: store }
                    }}>
                        {'Ver perfil de ' + product.store + ' '}
                        <FontAwesome icon="sign-in-alt" />
                    </Link>
                </div>)
            const productPrice = <div className="single-product-price"><span>{parsePrice(product.price)}</span></div>
            // const productStoreUrl = <div className="single-product-store-url"><a href={store.uri} target="_blank" rel="noopener">{store.uri}</a></div>
            const productLink = (<div className="single-product-link">
                <a href={product.url} target="_blank" rel="noopener">VER EN {product.store.toUpperCase()}</a>
                </div>)
            return (
                <div className="main">
                    <div className="single-product-main-container">
                        <div className="single-product-container">
                            {productImage}
                            {productName}
                            {productPrice}
                            {productCategoryAndAnimal}
                            {productStore}
                            {/* {productStoreUrl} */}
                            {productLink}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loading />
        }
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