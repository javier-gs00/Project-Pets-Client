import React, { Component } from 'react';

import './search.css'
import Client from '../../api.js'
import ProductGrid from './product-grid'
import SearchForm from './search-form'

class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            searchValue: ""
        }
    }

    handleChange = e => {
        const value = e.target.value
        this.setState({
            searchValue: value
        })
    };

    handleSubmit = () => {
        const query = this.state.searchValue

        if (query === "") {
            this.setState({
                results: []
            });
        } else {
            Client.search(query, results => {
                this.setState({
                    results: results
                })
            })
        }
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSubmit()
        }
    }

    handleStoreFilterClick = e => {
        const store = e.target.innerHTML
        let filteredResults = this.state.results.filter(result => result.store === store)
        this.setState({results: filteredResults})
    }

    render() {
        const results = this.state.results
        const query = this.state.searchValue

        return (
            <div className="main">
                <SearchForm
                    value={ this.state.searchValue }
                    onChange={ this.handleChange }
                    onClick={ this.handleSubmit } 
                    onKeyPress={ this.handleKeyPress } />
                {this.showResults(results, query)}
            </div>
        ) 
    }

    showResults = (results, query) => {
        if (results.length > 0) {
            return (
                <div>
                    <button onClick={this.handleFiltersDisplay}>Filtrar</button>
                    <ProductGrid 
                        results={results}
                        handleStoreFilterClick={this.handleStoreFilterClick}/>
                </div>
            )
        } else if (results.length === 0 && query !== '') {
            return <div>No se encontraron resultados</div>
        }
    }

    handleFiltersDisplay = e => {
        if (this.state.results.length > 0) {
            if (document.getElementById('filters').classList.contains('hidden')){
                document.getElementById('filters').classList.remove('hidden')
            } else {
                document.getElementById('filters').classList.add('hidden')
            }
        }
    }
}

export default SearchContainer