import React, { Component } from 'react'
import './search.css'
import Client from '../../api.js'
import ProductGrid from './product-grid.jsx'
import SearchForm from './search-form'

class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            searchValue: "",
            storeFilters: [],
            petFilters: [],
            categoryFilters: []
        }
    }

    handleInputChange = e => {
        this.setState({
            searchValue: e.target.value
        })
    }

    handleSubmit = () => {
        const query = this.state.searchValue
        if (query === "") {
            this.setState({ results: [] })
        } else {
            Client.search(query, results => {
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

                this.setState({ 
                    results: results,
                    storeFilters: storeFilters,
                    petFilters: petFilters,
                    categoryFilters: categoryFilters
                })
            })
        }
    }

    handleInputKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    }

    // Receives an object containing the the filter name(id) and its new checked value
    handleStoreFilterChange = newStoreFilter => {
        let currentFilters = this.state.storeFilters
        const newStoreFilters = currentFilters.map(store => {
            if (store.id === newStoreFilter.id) {
                store.checked = newStoreFilter.checked
            }
            return store
        })
        this.setState({ storeFilter: newStoreFilters })
    }

    handlePetFilterChange = newPetFilter => {
        let currentFilters = this.state.petFilters
        const newPetFilters = currentFilters.map(pet => {
            if (pet.id === newPetFilter.id) {
                pet.checked = newPetFilter.checked
            }
            return pet
        })
        this.setState({ petFilters: newPetFilters})
    }

    handleCategoryFilterChange = newCategoryFilter => {
        let currentFilters = this.state.categoryFilters
        const newCategoryFilters = currentFilters.map(category => {
            if (category.id === newCategoryFilter.id) {
                category.checked = newCategoryFilter.checked
            }
            return category
        })
        this.setState({ categoryFilters: newCategoryFilters})
    }

    render() {
        const results = this.state.results
        const stores = this.state.storeFilters
        const pets = this.state.petFilters
        const categories = this.state.categoryFilters

        return (
            <div className="main">
                <SearchForm
                    value={this.state.searchValue}
                    onChange={this.handleInputChange}
                    onClick={this.handleSubmit} 
                    onKeyPress={this.handleInputKeyPress} />
                {results.length > 0
                ?<ProductGrid 
                    results={results}
                    stores={stores}
                    pets={pets}
                    categories={categories}
                    handleFiltersDisplay={this.handleFiltersDisplay}
                    onStoreFilterChange={this.handleStoreFilterChange}
                    onPetFilterChange={this.handlePetFilterChange}
                    onCategoryFilterChange={this.handleCategoryFilterChange}/>
                :<span></span>}
            </div>
        ) 
    }
}

export default SearchContainer