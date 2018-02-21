import React from 'react'
import PropTypes from 'prop-types'
import ProductFilter from './product-filter'
import ProductGrid from './product-grid'
import ProductNav from './product-nav'
import LoadingScreen from './loading'

const ProductsDisplay = props => {
    const { isLoading,
        products,
        pages,
        searchValue,
        totalProductsFoundLength,
        filteredProductsFoundLength,
        ...rest } = props

    return ( isLoading
        ? <LoadingScreen />
        : totalProductsFoundLength
        ? <div className="products-container">
            <ProductFilter {...rest} />
            { filteredProductsFoundLength === 0
            ? <div className="products-display-container">
                <div className="products-reactivate-filters">
                    <span>Vuelve a activar alguno de los filtros para poder ver los resultados</span>
                </div>
            </div>
            : <div className="products-display-container" >
                <ProductGrid products={products} />
                <ProductNav pages={pages} />
            </div>
            /* <div className="ads-banner-container"></div> */ }
        </div>
        : <div className="products-container">
            <div className="products-no-results-container">
                <span>No se encontraron resultados para tu busqueda "{searchValue}"</span>
            </div>
            {/* <div className="ads-banner-container"></div> */}
        </div>
    )
}

ProductsDisplay.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchValue: PropTypes.string.isRequired,
    totalProductsFoundLength: PropTypes.number.isRequired,
    filteredProductsFoundLength: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(PropTypes.object),
    handleFiltersDisplay: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProductsDisplay