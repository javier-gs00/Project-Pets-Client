import React, { Component } from 'react'
import './search.css'
import Client from '../../api.js'
import ProductGrid from './product-grid.jsx'
import SearchForm from './search-form'
// import { connect } from 'react-redux'
// import { loadProducts } from '../../actions/actions'

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

    handleInputChange = e => this.setState({ searchValue: e.target.value })

    handleSubmit = () => {
        const query = this.state.searchValue
        if (query === "") {
            return this.setState({ results: [] })
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
            return this.handleSubmit()
        }
    }

    // Receives an object containing the the filter name(id) and its new checked value
    handleStoreFilterChange = newStoreFilter => {
        const newStoreFilters = this.state.storeFilters.map(store => {
            if (store.id === newStoreFilter.id) {
                store.checked = newStoreFilter.checked
            }
            return store
        })
        return this.setState({ storeFilter: newStoreFilters })
    }

    handlePetFilterChange = newPetFilter => {
        const newPetFilters = this.state.petFilters.map(pet => {
            if (pet.id === newPetFilter.id) {
                pet.checked = newPetFilter.checked
            }
            return pet
        })
        return this.setState({ petFilters: newPetFilters})
    }

    handleCategoryFilterChange = newCategoryFilter => {
        const newCategoryFilters = this.state.categoryFilters.map(category => {
            if (category.id === newCategoryFilter.id) {
                category.checked = newCategoryFilter.checked
            }
            return category
        })
        return this.setState({ categoryFilters: newCategoryFilters})
    }

    render() {
        const { results, storeFilters, petFilters, categoryFilters } = this.state

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
                    stores={storeFilters}
                    pets={petFilters}
                    categories={categoryFilters}
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