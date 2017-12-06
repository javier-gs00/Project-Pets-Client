import React, { Component } from 'react';

import './search.css'
import Client from '../../api.js'
import Product from '../../components/Products/Product'
import SearchBar from '../../components/Search/SearchBar'

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

    render() {
        const results = this.state.results
        return (
            <div className="main">
                <SearchBar 
                    value={ this.state.searchValue }
                    onChange={ this.handleChange }
                    onClick={ this.handleSubmit } 
                    onKeyPress={ this.handleKeyPress } />
                {results?
                    <Product 
                        results={ this.state.results } />
                    :<div>No se encontraron resultados</div>
                }
            </div>
        ) 
    }
}

export default SearchContainer