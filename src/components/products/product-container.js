import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import queryString from 'query-string'
import { connect } from 'react-redux'
import Client from '../../api.js'

// Redux Actions
import { loadProducts } from '../../actions/actions'

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

const mapStateToProps = state => ({ reduxProducts: state.products })

const mapDispatchToProps = { loadProducts: loadProducts }

class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pathname: null,
            isLoading: false,
            results: [],
            activePage: 1,
            searchValue: "",
            filters: []
        }
    }

    componentDidMount() {
        // console.log(this.props.reduxProducts)
        const { location } = this.props
        const fullRouteName = location.pathname + location.search

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
                this.props.loadProducts(results.results)
                // console.log(this.props.reduxProducts)
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

    // REVIEW THE OPTION OF MAKING THE API CALL ON SUBMIT AND REMOVING IT 
    // FROM COMPONENT WILL RECEIVE PROPS TO AVOID PERFORMANCE ISSUES
    // ONE OPTION IS TO MAKE IT ON SUBMIT, SET THE STATE AND THEN CHANGE THE URL

    componentWillReceiveProps(nextProps) {
        console.log('ComponentWillReceiveProps')
        const { pathname } = this.state
        // ComponentWillReceiveProps will fire while ComponentDidMount is executing
        // therefore, the pathname on the first request will be null since ComponentDidMount
        // hasn't finished. So if  pathname is null just exit this method
        const { location, newState = location.state } = nextProps
        // const newPath = location.pathname + location.search
        if (pathname === null) return false
        console.log('pass first check')
        console.log(newState)
        this.setState({
            ...newState,
            isLoading: false,
        }, () => console.log(this.state))
        // const parsedUrlQuery = queryString.parse(location.search)
        // return performApiRequest(parsedUrlQuery.query)
        // .then(results => {
        //     // this.props.loadProducts(results.results)
        //     // console.log(this.props.reduxProducts)
        //     this.setState({
        //         ...results,
        //         pathname: newPath,
        //         isLoading: false,
        //         activePage: 1,
        //     })
        // })
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
            // history.push(`/productos/resultados?query=${query}`)
            this.setState({ isLoading: true })
            return performApiRequest(query)
            .then(results => history.push({
                pathname: `/productos/resultados`,
                search: `?query=${query}`,
                state: {
                    ...results,
                    pathname: `/productos/resultados?query=${query}`,
                    activePage: 1,
                }
            }))
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

    handleFilterChange = e => this.setState({
        filters: this.state.filters.map(filter => filter.id === e.target.id
            ? { ...filter, checked: !filter.checked }
            : filter),
        activePage: 1
    })
    

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
            isLoading,
            searchValue,
            results,
            activePage,
            filters } = this.state

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
                    <SearchForm
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
                                handleFiltersDisplay={this.handleFiltersDisplay}
                                handleFilterChange={this.handleFilterChange}
                                filters={filters} /> }
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

const ProductsContainer = connect(
    mapStateToProps,
    mapDispatchToProps)(SearchContainer)

export default ProductsContainer

// Performs the search request on the API and returns
// an object containing the necessary objects for the state
// Default query is for when the component first loads
function performApiRequest(query = "royal canin maxi") {
    return new Promise (function(resolve, reject) {
        Client.search(query, function (results) {
            // Define a text for the animal property of the products that have ""
            // This must be fixed in the spider that scrapes the content preferably
            // or in the back end before sending the results
            results = results.map(product => product.animal === ""
                ? { ...product, animal: "no especifica"}
                : product)
            const storeFilters = results
                // retrieve the store values from the results
                .map(result => result.store)
                // get an array with only the resulting stores
                .filter((store, index, self) => self.indexOf(store) === index)
                // Create the filter objects defaulting to true to show all the results at first
                .map(storeName => ({id: storeName, checked: true, filterType: 'store'}))
        
            const petFilters = results
                .map(result => result.animal)
                .filter((pet, index, self) => self.indexOf(pet) === index)
                .map(petKind => ({id: petKind, checked: true, filterType: 'pet'}))
            
            const categoryFilters = results
                .map(result => result.category)
                .filter((category, index, self) => self.indexOf(category) === index)
                .map(category => ({id: category, checked: true, filterType: 'category'}))

            const filters = [...storeFilters, ...petFilters, ...categoryFilters]

            resolve({ results, filters })
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