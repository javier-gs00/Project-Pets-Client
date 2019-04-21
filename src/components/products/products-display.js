import React from 'react'
import PropTypes from 'prop-types'
import ProductFilter from './product-filter'
import ProductGrid from './product-grid'
import ProductNav from './product-nav'
import Loader from '../loader/loader'
import './products-display.scss'

const ProductsDisplay = props => {
  const {
    isLoading,
    products,
    path,
    pages,
    searchValue,
    totalProductsFoundLength,
    filteredProductsFoundLength,
    activePage,
    handleActivePageChange,
    ...rest
  } = props

  return isLoading ? (
    <Loader />
  ) : totalProductsFoundLength ? (
    <div>
      {props.totalProductsFoundLength ? (
        <div className="search-text-container">
          <span>
            {props.filteredProductsFoundLength < props.totalProductsFoundLength
              ? `${props.filteredProductsFoundLength} de ${
                  props.totalProductsFoundLength
                } resultados cumplen con los filtros seleccionados`
              : `Se encontraron ${props.totalProductsFoundLength} resultados para tú busqueda`}
          </span>
        </div>
      ) : null}
      <div className="products-container">
        <ProductFilter {...rest} path={path} />
        {filteredProductsFoundLength === 0 ? (
          <div className="products-display-container">
            <div className="products-reactivate-filters">
              <span>Vuelve a activar alguno de los filtros para poder ver los resultados ;)</span>
            </div>
          </div>
        ) : (
          <div className="products-display-container">
            <ProductGrid products={products} path={path} />
            <ProductNav
              activePage={activePage}
              handleActivePageChange={handleActivePageChange}
              filteredProductsFoundLength={filteredProductsFoundLength}
            />
          </div>
        )
        /* <div className="ads-banner-container"></div> */
        }
      </div>
    </div>
  ) : (
    <div className="products-container">
      <div className="products-no-results-container">
        <span>No se encontraron resultados para tu busqueda "{searchValue}" :(</span>
      </div>
      {/* <div className="ads-banner-container"></div> */}
    </div>
  )
}

ProductsDisplay.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  totalProductsFoundLength: PropTypes.number.isRequired,
  filteredProductsFoundLength: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSort: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  handleActivePageChange: PropTypes.func.isRequired
}

export default ProductsDisplay
