import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import queryString from 'query-string'
import { connect } from 'react-redux'
import Client from '../../api.js'

// Redux Actions
import { addProducts,
    startRotatingSpinner,
    stopRotatingSpinner,
    handleInputTextChange,
    handleFilterChange,
    handleActivePageChange } from '../../actions/actions'

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
    handleActivePageChange: handleActivePageChange
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
            return performApiRequest(parsedUrlQuery.query)
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
            return performApiRequest()
            .then(results => {
                addProducts(
                    routeName,
                    "royal canin maxi",
                    results.products,
                    results.filters)
            })
        }
    }

    handleInputChange = e => this.props.handleInputTextChange(e.target.value)

    handleInputKeyPress = e => e.key === 'Enter' ? this.handleSubmit() : false

    handleSubmit = () => {
        const { history, startRotatingSpinner, addProducts } = this.props
        const searchValue = document.getElementById('search').value
        if (searchValue === "") {
            return this.props.handleInputTextChange(searchValue)
        } else {
            startRotatingSpinner()
            return performApiRequest(searchValue)
            .then(results => {
                addProducts(
                    `/productos/resultados?query=${searchValue}`,
                    searchValue,
                    results.products,
                    results.filters
                )
                return history.push({
                    pathname: `/productos/resultados`,
                    search: `?query=${searchValue}`,
                })
            })
        }
    }

    // Function to change the activePage, which determines what range of the products array
    // will be shown
    handleActivePageChange = e => {
        const { activePage, handleActivePageChange } = this.props
        let newPage = e.currentTarget.innerHTML
        if (newPage === '&lt;') {
            window.scrollTo(0, 0)
            return handleActivePageChange(activePage - 1)
          } else if (newPage === '&gt;') {
            window.scrollTo(0, 0)
            return handleActivePageChange(activePage + 1)
        } else {
            window.scrollTo(0, 0)
            newPage = parseInt(newPage, 10)
            return handleActivePageChange(newPage)
        }
    }

    handleFilterChange = e => this.props.handleFilterChange(e.target.id)  

    handleFiltersDisplay = e => {
        const filters = document.getElementById('filters')
        const toggleFilters = document.getElementsByClassName('filters-show-toggle')[0]
        const toggleFiltersText = document.getElementById('filter-toggle-text')
        if (filters.style.maxHeight) {
            filters.style.maxHeight = null
            toggleFilters.classList.remove('filters-rotated')
            toggleFilters.classList.add('filters-not-rotated')
            toggleFiltersText.innerHTML = 'Mostrar Filtros'
        } else {
            filters.style.maxHeight = filters.scrollHeight + "px"
            toggleFilters.classList.remove('filters-not-rotated')
            toggleFilters.classList.add('filters-rotated')
            toggleFiltersText.innerHTML = 'Ocultar Filtros'
        }
    }

    render() {
        const {
            products,
            isLoading,
            activePage,
            searchValue,
            filters } = this.props

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
                }
            })

        const filteredProductsFoundLength = totalProducts.length
        // Calculate page ranges
        const start = activePage === 1 ? 0 : 20 * (activePage - 1)
        const end = activePage === 1 ? 20 : 20 * (activePage - 1) + 20     
        const pages = calculatePages(activePage, totalProducts, this.handleActivePageChange)
        // List of products to render
        const results = totalProducts.slice(start, end)
        
        return (
            <div id="main" className="main">
                <div className="products-main-container" >
                    <SearchForm
                        totalProductsFoundLength={totalProductsFoundLength}
                        filteredProductsFoundLength={filteredProductsFoundLength}
                        onClick={this.handleSubmit} 
                        onKeyPress={this.handleInputKeyPress} />
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
                                pages={pages}
                                handleFiltersDisplay={this.handleFiltersDisplay}
                                handleFilterChange={this.handleFilterChange}
                                filters={newFilters} /> }
                        />
                        <Route path="/productos" exact render={ props =>
                            <div className="products-container">
                                <div className="products-display-container">
                                    {isLoading
                                    ? <Loading />
                                    : <AsyncProductGrid {...props}
                                        products={results} />} 
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

// Performs the search request on the API and returns
// an object containing the necessary objects for the state
// Default query is for when the component first loads
function performApiRequest(query = "royal canin maxi") {
    return new Promise (function(resolve, reject) {
        Client.search(query, function (products) {
            // Define a text for the animal property of the products that have ""
            // This must be fixed in the spider that scrapes the content preferably
            // or in the back end before sending the results
            products = products.map(product => product.animal === ""
                ? { ...product, animal: "no especifica"}
                : product)
            const storeFilters = products
                // retrieve the store values from the results
                .map(result => result.store)
                // get an array with only the resulting stores
                .filter((store, index, self) => self.indexOf(store) === index)
                // Create the filter objects defaulting to true to show all the results at first
                .map(storeName => ({id: storeName, checked: true, filterType: 'store'}))
        
            const petFilters = products
                .map(result => result.animal)
                .filter((pet, index, self) => self.indexOf(pet) === index)
                .map(petKind => ({id: petKind, checked: true, filterType: 'pet'}))
            
            const categoryFilters = products
                .map(result => result.category)
                .filter((category, index, self) => self.indexOf(category) === index)
                .map(category => ({id: category, checked: true, filterType: 'category'}))

            const filters = [...storeFilters, ...petFilters, ...categoryFilters]

            resolve({ products, filters })
            reject({})
        })
    })
}

// Returns an array with HTML buttons for navigating between products pages
function calculatePages(activePage, products, navigate) {
    if (products.length <= 20) return [<button key="0" onClick={navigate}>1</button>]
    // calculate the number of pages
    const pageQuantity = Math.floor(products.length / 20) + 1
    let buttonsArray = []
    // calculate the values of each navigation button
    buttonsArray.push(activePage !== 1
        ? <button key="0" onClick={navigate}>{'<'}</button>
        : null)
    buttonsArray.push(<button key="1"
        className={activePage === 1 ? 'products-nav-active' : null }
        onClick={navigate}>{activePage === 1 ? '1' : activePage - 1 }</button>) 
    buttonsArray.push(pageQuantity < 3
        ? <button key="2"
            className={activePage !== 1 && activePage === pageQuantity ? 'products-nav-active' : null }
            onClick={navigate}>{activePage === 1 ? '2' : activePage }</button>
        : <button key="2"
            className={activePage !== 1 && activePage !== pageQuantity ? 'products-nav-active' : null }
            onClick={navigate}>{activePage === 1 ? '2' : activePage }</button>) 
    buttonsArray.push(pageQuantity >= 3
        ? <button key="3"
            className={activePage === pageQuantity ? 'products-nav-active' : null }
            onClick={navigate}>{activePage === 1 ? '3' : activePage + 1 }</button>
        : null)
    buttonsArray.push(activePage !== pageQuantity
        ? <button key="4" onClick={navigate}>{'>'}</button>
        : null)
    return buttonsArray
}