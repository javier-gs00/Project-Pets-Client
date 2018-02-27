import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { apiProductsSearch } from '../../api'

// Redux Actions
import { addProducts,
    startRotatingSpinner,
    stopRotatingSpinner,
    handleInputTextChange,
    handleFilterChange,
    handleActivePageChange,
    handleSortByPrice } from '../../actions/actions'

// Components
import SearchForm from './search-form'
import Loading from './loading'

const AsyncProductGrid = Loadable({
    loader: () => import('./product-grid'),
    loading: Loading
})

const AsyncProductsDisplay = Loadable({
    loader: () => import('./products-display'),
    loading: Loading
})

const AsyncSingleProductView = Loadable({
    loader: () => import('./product-view'),
    loading: Loading
})

const mapStateToProps = ({ products }) => ({
    pathname: products.pathname,
    products: products.products,
    isLoading: products.isLoading,
    activePage: products.activePage,
    searchValue: products.searchValue,
    filters: products.filters
})

const mapDispatchToProps = {
    startRotatingSpinner: startRotatingSpinner,
    stopRotatingSpinner: stopRotatingSpinner,
    addProducts: addProducts,
    handleInputTextChange: handleInputTextChange,
    handleFilterChange: handleFilterChange,
    handleActivePageChange: handleActivePageChange,
    handleSortByPrice: handleSortByPrice
}

class SearchContainer extends Component {
    componentDidMount() {
        const { location,
            history,
            pathname,
            products,
            startRotatingSpinner,
            stopRotatingSpinner,
            addProducts,
            getActiveRoute } = this.props
        const fullRouteName = location.pathname + location.search

        const routeName = location.pathname === '/productos'
            ? location.pathname
            : "/" + location.pathname.split("/")[1]
        getActiveRoute(routeName)

        const parsedUrlQuery = queryString.parse(location.search)
        startRotatingSpinner()
        // Check for products in the store, in case the user has already navigated in the app
         if (products.length > 0) {
            stopRotatingSpinner()
            return history.push(pathname)
         } else if (parsedUrlQuery.query) {
            // Perform a custom API request if the URL contains a query parameter
            // This is in case someone navigates directly through the URL
            return apiProductsSearch(parsedUrlQuery.query)
            .then(results => {
                addProducts(
                    fullRouteName,
                    parsedUrlQuery.query,
                    results.products,
                    results.filters)
            })            
        }
        else {
        // Perform a predefined API request if no query parameter received
        // This is for when someone first loads this page (navigates directly to "/")
            return apiProductsSearch()
            .then(results => {
                addProducts(
                    routeName,
                    "royal canin maxi",
                    results.products,
                    results.filters)
            })
        }
    }

    // Function to change the activePage, which determines what range of the products array
    // will be shown
    handleActivePageChange = e => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
        this.props.handleActivePageChange(e.currentTarget.innerHTML)
    }

    handleFilterChange = e => this.props.handleFilterChange(e.target.id)

    handleSort = e => {
        const filterName = e.currentTarget.id
        const nullSort = document.getElementById('null_sort')
        const descSort = document.getElementById('desc_sort')
        const ascSort = document.getElementById('asc_sort')
        switch (filterName) {
            case 'null_sort':
                if (nullSort.classList.contains('filter-svg-item-active')) return false
                descSort.classList.remove('filter-svg-item-active')
                ascSort.classList.remove('filter-svg-item-active')
                nullSort.style.display = 'none'
                return this.props.handleSortByPrice('undo')
            case 'desc_sort':
                if (descSort.classList.contains('filter-svg-item-active')) return false
                descSort.classList.add('filter-svg-item-active')
                ascSort.classList.remove('filter-svg-item-active')
                nullSort.style.display = 'flex'
                return this.props.handleSortByPrice('desc')
            case 'asc_sort':
                if (ascSort.classList.contains('filter-svg-item-active')) return false
                ascSort.classList.add('filter-svg-item-active')
                descSort.classList.remove('filter-svg-item-active')
                nullSort.style.display = 'flex'
                return this.props.handleSortByPrice('asc')
            default:
                return false
        }
    }

    render() {
        const {
            products,
            isLoading,
            activePage,
            searchValue,
            filters,
            history } = this.props

        // Get the checked store filters and put them in an array
        const activeStoreFilters = filters
            .filter(filter => filter.filterType === 'store')
            .filter(store => store.checked)
            .map(store => store.id)
        // Get the checked pet filters and put them in an array
        const activePetFilters = filters
            .filter(filter => filter.filterType === 'pet')
            .filter(pet => pet.checked)
            .map(pet => pet.id)
        // Get the checked category filters and put them in an array
        const activeCategoryFilters = filters
            .filter(filter => filter.filterType === 'category')
            .filter(category => category.checked)
            .map(category => category.id)
        const totalProductsFoundLength = products.length
        // Get the products matching the active store filters
        const totalProducts = products
            .filter(product => activeStoreFilters.indexOf(product.store) !== -1)
            .filter(product => activePetFilters.indexOf(product.animal) !== -1)
            .filter(product => activeCategoryFilters.indexOf(product.category) !== -1)
        
        // Calculate the available stores, pets and categories after applying filters
        // to create a new filter object with the modified checked attributes
        // This is done to enable or disable the check prop of the input automatically
        const storesAfterFilters = totalProducts
            .map(product => product.store)
            .filter((store, index, self) => self.indexOf(store) === index)
        const petsAfterFilters = totalProducts
            .map(product => product.animal)
            .filter((pet, index, self) => self.indexOf(pet) === index)
        const categoriesAfterFilters = totalProducts
            .map(product => product.category)
            .filter((pet, index, self) => self.indexOf(pet) === index)
        const newFilters = filters
            .map(filter => {
                if (filter.filterType === 'store') {
                    return ({
                        ...filter,
                        checked: storesAfterFilters.indexOf(filter.id) !== -1 ? true : false
                    })   
                } else if (filter.filterType === 'pet') {
                    return ({
                        ...filter,
                        checked: petsAfterFilters.indexOf(filter.id) !== -1 ? true : false
                    })
                } else if (filter.filterType === 'category') {
                    return ({
                        ...filter,
                        checked: categoriesAfterFilters.indexOf(filter.id) !== -1 ? true : false
                    })
                } else {
                    return false
                }
            })

        const filteredProductsFoundLength = totalProducts.length
        // Calculate page ranges
        const start = 20 * (activePage - 1)
        const end =  20 * (activePage - 1) + 20     
        // List of products to render
        const results = totalProducts.slice(start, end)
        
        return (
            <div id="main" className="main">
                <div className="products-main-container" >
                    <SearchForm history={history} />
                    <Switch >
                        <Route path="/productos/resultados/:id" render={ props => 
                            <AsyncSingleProductView {...props} /> }
                        />
                        <Route path="/productos/resultados" render={ props =>                     
                            <AsyncProductsDisplay {...props}
                                isLoading={isLoading}
                                searchValue={searchValue}
                                totalProductsFoundLength={totalProductsFoundLength}
                                filteredProductsFoundLength={filteredProductsFoundLength}
                                products={results}
                                path={'/productos/resultados'}
                                activePage={activePage}
                                handleActivePageChange={this.handleActivePageChange}
                                handleFilterChange={this.handleFilterChange}
                                handleSort={this.handleSort}
                                filters={newFilters} /> }
                        />
                        <Route path="/productos" exact render={ props =>
                            <div className="products-container">
                                <div className="products-display-container">
                                    {isLoading
                                    ? <Loading />
                                    : <AsyncProductGrid {...props}
                                        products={results}
                                        path={'/productos/resultados'} />} 
                                </div>
                            </div>}
                        />
                    </Switch >
                </div>
            </div>
        ) 
    }
}

SearchContainer.propTypes = {
    getActiveRoute: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    activePage: PropTypes.number.isRequired,
    searchValue: PropTypes.string.isRequired,
    filters: PropTypes.array.isRequired
}

const ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(SearchContainer)

export default ProductsContainer