import React, { Component } from 'react'
import './search.css'
import Client from '../../api.js'
import ProductGrid from './product-grid.jsx'
import SearchForm from './search-form.jsx'

class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            searchValue: "",
            storeFilters: []
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
                // retrieve the store values from the results
                const stores = results.map(result => result.store)
                // get an array with only the resulting stores
                const storeList = stores.filter((store, index, self) => self.indexOf(store) === index)
                // Create the filter objects defaulting to true to show all the results at first
                const storeFilters = storeList.map(storeName => ({id: storeName, checked: true}))

                this.setState({ 
                    results: results,
                    storeFilters: storeFilters
                })
            })
        }
    }

    handleInputKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    }

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

    render() {
        const results = this.state.results
        const stores = this.state.storeFilters

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
                    handleFiltersDisplay={this.handleFiltersDisplay}
                    onStoreFilterChange={this.handleStoreFilterChange}/>
                :<span></span>}
            </div>
        ) 
    }
}

export default SearchContainer