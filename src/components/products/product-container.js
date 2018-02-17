import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import Client from '../../api.js'

// Components
import Loadable from 'react-loadable'
import Loading from './loading'
// import { connect } from 'react-redux'
// import { loadProducts } from '../../actions/actions'

const AsyncSearchForm = Loadable({
    loader: () => import('./search-form'),
    loading: Loading
})

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

class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pathname: null,
            isLoading: false,
            results: [],
            activePage: 1,
            searchValue: "",
            storeFilters: [],
            petFilters: [],
            categoryFilters: []
        }
    }

    componentDidMount() {
        const { location } = this.props
        const fullRouteName = location.pathname + location.search
        // this.setState({ pathname: fullRouteName })

        const routeName = location.pathname === '/productos'
            ? location.pathname
            : "/" + location.pathname.split("/")[1]
        this.props.getActiveRoute(routeName)

        const parsedUrlQuery = queryString.parse(location.search)
        // Perform a custom API request if the URL contains a query parameter
        if (parsedUrlQuery.query) {
            this.setState({ isLoading: true })
            return performApiRequest(parsedUrlQuery.query)
            .then(results => {
                this.setState({
                    ...results,
                    pathname: fullRouteName,
                    isLoading: false,
                    activePage: 1,
                })
            })            
        } else {
        // Perform a predefined API request if no query parameter received
            this.setState({ isLoading: true })
            return performApiRequest()
            .then(results => {
                this.setState({
                    ...results,
                    pathname: fullRouteName,
                    isLoading: false,
                    activePage: 1,
                })
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { pathname } = this.state
        // ComponentWillReceiveProps will fire while ComponentDidMount is executing
        // therefore, the pathname on the first request will be null since ComponentDidMount
        // hasn't finished. So if  pathname is null just exit this method
        if (pathname === null ) return false
        const { location } = nextProps
        const newPath = location.pathname + location.search
        if (pathname !== newPath) {
            const parsedUrlQuery = queryString.parse(location.search)
            return performApiRequest(parsedUrlQuery.query)
            .then(results => {
                this.setState({
                    ...results,
                    pathname: newPath,
                    isLoading: false,
                    activePage: 1,
                })
            })
        }
    }

    handleInputChange = e => this.setState({ searchValue: e.target.value })

    handleSubmit = () => {
        const { history } = this.props
        this.setState({ isLoading: true })
        const query = this.state.searchValue
        if (query === "") {
            return this.setState({
                results: [],
                isLoading: false
            })
        } else {
            return history.push(`/productos/resultados?query=${query}`)
        }
    }

    handleInputKeyPress = e => {
        if (e.key === 'Enter') {
            return this.handleSubmit()
        }
    }

    // Function to change the activePage, which determines what range of the products array
    // will be shown
    handleActivePageChange = e => {
        const { activePage } = this.state
        let newPage = e.currentTarget.innerHTML
        if (newPage === '&lt;') {
            window.scrollTo(0, 0)
            return this.setState({ activePage: activePage - 1 })
          } else if (newPage === '&gt;') {
            window.scrollTo(0, 0)
            return this.setState({ activePage: activePage + 1 })
        } else {
            window.scrollTo(0, 0)
            newPage = parseInt(newPage, 10)
            return this.setState({ activePage: newPage })
        }
    }

    // Listens for an event that comes from a input type checkbox that provides and id and checked value
    handleStoreFilterChange = e => {
        const newFilterId = e.target.id
        const newFilterCheck = e.target.checked
        const newStoreFilters = this.state.storeFilters.map(store => {
            if (store.id === newFilterId) {
                store.checked = newFilterCheck
            }
            return store
        })
        return this.setState({ storeFilter: newStoreFilters, activePage: 0 })
    }

    handlePetFilterChange = e => {
        const newFilterId = e.target.id
        const newFilterCheck = e.target.checked
        const newPetFilters = this.state.petFilters.map(pet => {
            if (pet.id === newFilterId) {
                pet.checked = newFilterCheck
            }
            return pet
        })
        return this.setState({ petFilters: newPetFilters, activePage: 0 })
    }

    handleCategoryFilterChange = e => {
        const newFilterId = e.target.id
        const newFilterCheck = e.target.checked
        const newCategoryFilters = this.state.categoryFilters.map(category => {
            if (category.id === newFilterId) {
                category.checked = newFilterCheck
            }
            return category
        })
        return this.setState({ categoryFilters: newCategoryFilters, activePage: 0 })
    }

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
        const { isLoading, searchValue, results, activePage, storeFilters, petFilters, categoryFilters } = this.state

        // Get the checked store filters and put them in an array
        const activeStoreFilters = storeFilters
            .filter(store => store.checked)
            .map(store => store.id)
        // Get the checked pet filters and put them in an array
        const activePetFilters = petFilters
            .filter(pet => pet.checked)
            .map(pet => pet.id)
        // Get the checked category filters and put them in an array
        const activeCategoryFilters = categoryFilters
            .filter(category => category.checked)
            .map(category => category.id)
        // Get the products matching the active store filters
        const totalProducts = results
            .filter(product => activeStoreFilters.indexOf(product.store) !== -1)
            .filter(product => activePetFilters.indexOf(product.animal) !== -1)
            .filter(product => activeCategoryFilters.indexOf(product.category) !== -1)
        // Calculate page ranges
        const start = activePage === 1 ? 0 : 20 * (activePage - 1)
        const end = activePage === 1 ? 20 : 20 * (activePage - 1) + 20     
        const pages = calculatePages(activePage, totalProducts, this.handleActivePageChange)
        // List of products to render
        const products = totalProducts.slice(start, end)
        
        return (
            <div id="main" className="main">
                <div className="products-main-container" >
                    <AsyncSearchForm
                        value={searchValue}
                        onChange={this.handleInputChange}
                        onClick={this.handleSubmit} 
                        onKeyPress={this.handleInputKeyPress} />
                    <Switch >
                        <Route path="/productos/resultados/:id" render={ props => 
                            <AsyncSingleProductView {...props} /> }
                        />
                        <Route path="/productos/resultados" render={ props =>                     
                            <AsyncProductsDisplay {...props}
                                isLoading={isLoading}
                                products={products}
                                pages={pages}
                                storeFilters={storeFilters}
                                petFilters={petFilters}
                                categoryFilters={categoryFilters}
                                handleFiltersDisplay={this.handleFiltersDisplay}
                                handleStoreFilterChange={this.handleStoreFilterChange}
                                handlePetFilterChange={this.handlePetFilterChange}
                                handleCategoryFilterChange={this.handleCategoryFilterChange} /> }
                        />
                        <Route path="/productos" exact render={ props =>
                            <div className="products-container">
                                <div className="products-display-container">
                                    {isLoading
                                    ? <Loading />
                                    : <AsyncProductGrid {...props}
                                    products={products} />} 
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
}

export default SearchContainer

// Performs the search request on the API and returns
// an object containing the necessary objects for the state
// Default query is for when the component first loads
function performApiRequest(query = "royal canin maxi") {
    return new Promise (function(resolve, reject) {
        Client.search(query, function (results) {
            const storeFilters = results
            // retrieve the store values from the results
            .map(result => result.store)
            // get an array with only the resulting stores
            .filter((store, index, self) => self.indexOf(store) === index)
            // Create the filter objects defaulting to true to show all the results at first
            .map(storeName => ({id: storeName, checked: true}))
        
            const petFilters = results
                .map(result => result.animal)
                .filter((pet, index, self) => self.indexOf(pet) === index)
                .map(petKind => ({id: petKind, checked: true}))
            
            const categoryFilters = results
                .map(result => result.category)
                .filter((category, index, self) => self.indexOf(category) === index)
                .map(category => ({id: category, checked: true}))

            resolve({ results,  storeFilters, petFilters, categoryFilters })
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