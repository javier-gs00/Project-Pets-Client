import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../api.js'
import ProductsDisplay from './products-display'
import SearchForm from './search-form'
import LoadingScreen from './loading'
// import { connect } from 'react-redux'
// import { loadProducts } from '../../actions/actions'

class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            results: [],
            activePage: 0,
            searchValue: "",
            storeFilters: [],
            petFilters: [],
            categoryFilters: []
        }
    }

    componentDidMount() {
        const { location } = this.props
        this.props.getActiveRoute(location.pathname)

        this.setState({ isLoading: true })
        return Client.search('royal canin maxi', results => {
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

            return this.setState({
                isLoading: false,
                results: results,
                storeFilters: storeFilters,
                petFilters: petFilters,
                categoryFilters: categoryFilters
            })
        })
    }

    handleInputChange = e => this.setState({ searchValue: e.target.value })

    handleSubmit = () => {
        this.setState({ isLoading: true })
        const query = this.state.searchValue
        if (query === "") {
            return this.setState({
                results: [],
                isLoading: false
            })
        } else {
            return Client.search(query, results => {
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

                return this.setState({
                    isLoading: false,
                    results: results,
                    activePage: 0,
                    storeFilters: storeFilters,
                    petFilters: petFilters,
                    categoryFilters: categoryFilters
                })
            })
        }
    }

    handleInputKeyPress = e => {
        if (e.key === 'Enter') {
            return this.handleSubmit()
        }
    }

    // Function to change the activePage, which determines what range of the products array
    // will be shown
    navigate = e => {
        const { activePage } = this.state
        const newPage = e.currentTarget.innerHTML
        console.log(newPage)
        if (newPage === '&lt;') {
            window.scrollTo(0, 0)
            return this.setState({ activePage: activePage - 1 })
        } else if (newPage === '&gt;') {
            window.scrollTo(0, 0)
            return this.setState({ activePage: activePage + 1 })
        } else {
            window.scrollTo(0, 0)
            return this.setState({ activePage: newPage - 1})
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
        const start = activePage === 0 ? 0 : 20 * activePage
        const end = activePage === 0 ? 20 : 20 * activePage + 20     
        const pages = calculatePages(activePage, totalProducts, this.navigate)
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
                    { isLoading
                    ? <LoadingScreen />
                    : <ProductsDisplay
                        products={products}
                        pages={pages}
                        storeFilters={storeFilters}
                        petFilters={petFilters}
                        categoryFilters={categoryFilters}
                        handleFiltersDisplay={this.handleFiltersDisplay}
                        handleStoreFilterChange={this.handleStoreFilterChange}
                        handlePetFilterChange={this.handlePetFilterChange}
                        handleCategoryFilterChange={this.handleCategoryFilterChange}/>}
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

// Returns an array with HTML buttons for navigating between products pages
function calculatePages(activePage, products, navigate) {
    // const { activePage } = this.props
    console.log(products.length)
    if (products.length <= 20) return [<button onClick={navigate}>1</button>]

    // calculate the number of pages
    const quantity = (Math.floor(products.length / 20)) + 1
    let buttonsArray = []
    // calculate the values of each navigation button
    buttonsArray.push(activePage !== 0
        ? <button onClick={navigate}>{'<'}</button>
        : null)
    buttonsArray.push(<button
        className={activePage === 0 ? 'products-nav-active' : null }
        onClick={navigate}>{activePage === 0 ? '1' : activePage}</button>) 
    buttonsArray.push(quantity < 3
        ? <button 
            className={activePage !== 0 && activePage === quantity - 1 ? 'products-nav-active' : null }
            onClick={navigate}>{activePage === 0 ? '2' : activePage + 1}</button>
        : <button 
            className={activePage !== 0 && activePage !== quantity - 1 ? 'products-nav-active' : null }
            onClick={navigate}>{activePage === 0 ? '2' : activePage + 1}</button>) 
    buttonsArray.push(quantity >= 3
        ? <button
            className={activePage === quantity - 1 ? 'products-nav-active' : null }
            onClick={navigate}>{activePage === 0 ? '3' : activePage + 2}</button>
        : null)
    buttonsArray.push(activePage !== quantity - 1
        ? <button onClick={navigate}>{'>'}</button>
        : null)
    return buttonsArray
}