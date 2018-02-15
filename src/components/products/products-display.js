import React from 'react'
import PropTypes from 'prop-types'
import ProductFilter from './product-filter'
import ProductGrid from './product-grid'
import ProductNav from './product-nav'

const ProductsDisplay = props => {
    const { products, pages, ...rest } = props

    return ( products.length > 0
        ? <div className="products-container">
            <ProductFilter {...rest} />
            <div className="products-display-container" >
                <ProductGrid products={products} />
                <ProductNav pages={pages} />
            </div>
            {/* <div className="ads-banner-container"></div> */}
        </div>
        : <div></div>
    )
}

ProductsDisplay.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.object),
    products: PropTypes.arrayOf(PropTypes.object),
    storeFilters: PropTypes.arrayOf(PropTypes.object),
    petFilters: PropTypes.arrayOf(PropTypes.object),
    categoryFilters: PropTypes.arrayOf(PropTypes.object),
    handleFiltersDisplay: PropTypes.func.isRequired,
    handleStoreFilterChange: PropTypes.func.isRequired,
    handlePetFilterChange: PropTypes.func.isRequired,
    handleCategoryFilterChange: PropTypes.func.isRequired
}

export default ProductsDisplay