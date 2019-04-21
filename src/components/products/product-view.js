import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../loader/loader'
import { Link } from 'react-router-dom'
import { apiFindProductById, apiGetStoreByName } from '../../api'
import { parsePrice } from '../../utils'
import './product-view.scss'

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

    // If props are received from the previous component (Link)
    if (location.state !== undefined) {
      return apiGetStoreByName(location.state.product.store).then(store =>
        this.setState({ product: location.state.product, store: store })
      )
    } else {
      // If the route was navigated directly
      let product, store
      return apiFindProductById(match.params.id)
        .then(response => {
          product = response
          return apiGetStoreByName(product.store)
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
      const productImage = (
        <div className="single-product-img">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      )
      const productName = (
        <div className="single-product-name">
          <h1>{product.name}</h1>
        </div>
      )
      const productCategoryAndAnimal = (
        <div className="single-product-category">
          <span>
            {product.category.slice(0, 1).toUpperCase() + product.category.slice(1)} para{' '}
            {product.animal}
          </span>
        </div>
      )
      const productStore = (
        <div className="single-product-store">
          <Link
            to={{
              pathname: `/tiendas/${product.store}`,
              state: { store: store }
            }}
          >
            {'Ver perfil de ' + product.store + ' '}
            <FontAwesomeIcon icon="sign-in-alt" />
          </Link>
        </div>
      )
      const productPrice = (
        <div className="single-product-price">
          <span>{parsePrice(product.price)}</span>
        </div>
      )
      // const productStoreUrl = <div className="single-product-store-url"><a href={store.uri} target="_blank" rel="noopener">{store.uri}</a></div>
      const productLink = (
        <div className="single-product-link">
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            VER EN {product.store.toUpperCase()}
          </a>
        </div>
      )
      return (
        // <div className="main">
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
        // </div>
      )
    } else {
      return <Loader />
    }
  }
}

ProductView.propTypes = {
  location: PropTypes.object.isRequired
}

export default ProductView
