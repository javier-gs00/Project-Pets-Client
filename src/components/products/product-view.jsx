import React from 'react'
import PropTypes from 'prop-types'
// import Loadable from 'react-loadable'
import Loading from './loading'
import ProductItem from './product-item'
import Client from '../../api'
import './products.css'

// const LoadableComponent = Loadable({
//     loader: () => import('./product-item'),
//     loading: Loading,
//     render(loaded, props) {
//         let Component = loaded.NamedExport
//         return <Component {...props} />
//     }
// })

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

        if (location.state !== undefined) {
            return this.setState({ product: location.state.product })
        } else {
            return Client.findProductById(match.params.id)
            .then(product => this.setState({ product: product }))
        }
    }

    render() {
        const { product } = this.state

        return (
            <div className="products-container">
                {product
                ? <ProductItem result={product} />
                : <Loading />}
            </div>
            // <LoadableComponent result={product} />
        )
    }
}

ProductView.propTypes = {
    getActiveRoute: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
}

export default ProductView