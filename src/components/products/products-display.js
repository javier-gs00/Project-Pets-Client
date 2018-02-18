import React from 'react'
import PropTypes from 'prop-types'
import ProductFilter from './product-filter'
import ProductGrid from './product-grid'
import ProductNav from './product-nav'
import LoadingScreen from './loading'

const ProductsDisplay = props => {
    const { isLoading, products, pages, ...rest } = props

    // return ( products.length > 0
    //     ? <div className="products-container">
    //         <ProductFilter {...rest} />
    //         <div className="products-display-container" >
    //             <ProductGrid products={products} />
    //             <ProductNav pages={pages} />
    //         </div>
    //         {/* <div className="ads-banner-container"></div> */}
    //     </div>
    //     : <div></div>
    // )
    return ( isLoading
        ? <LoadingScreen />
        : <div className="products-container">
            <ProductFilter {...rest} />
            <div className="products-display-container" >
                <ProductGrid products={products} />
                <ProductNav pages={pages} />
            </div>
            {/* <div className="ads-banner-container"></div> */}
        </div>
    )
}

ProductsDisplay.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    pages: PropTypes.arrayOf(PropTypes.object),
    products: PropTypes.arrayOf(PropTypes.object),
    handleFiltersDisplay: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object)
}

export default ProductsDisplay