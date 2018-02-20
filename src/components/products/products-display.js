import React from 'react'
import PropTypes from 'prop-types'
import ProductFilter from './product-filter'
import ProductGrid from './product-grid'
import ProductNav from './product-nav'
import LoadingScreen from './loading'

const ProductsDisplay = props => {
    const { isLoading, products, pages, searchValue, ...rest } = props

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
        : products.length > 0
        ? <div className="products-container">
            <ProductFilter {...rest} />
            <div className="products-display-container" >
                <ProductGrid products={products} />
                <ProductNav pages={pages} />
            </div>
            {/* <div className="ads-banner-container"></div> */}
        </div>
        : <div className="products-container">
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '1.8rem'
            }}>
                <span style={{
                    height: '300px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 4px -1px rgba(70, 70, 70, 0.5)',
                    // maxWidth: '500px',
                    maxWidth: '490px',
                    padding: '0 5px'
                }}>No se encontraron resultados para tu busqueda {searchValue}</span>
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