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
        const value = e.target.value;

        this.setState({
            searchValue: value
        })
    };

    handleSubmit = () => {
        const query = this.state.searchValue;

        if (query === "") {
            this.setState({
                results: []
            });
        } else {
            Client.search(query, results => {
                console.log(results);
                console.log(results.length)
                this.setState({
                    results: results
                })
            })
        }
    };

    render() {
        const results = this.state.results;
        return (
            <div className="main">
                <SearchBar 
                    value={ this.state.searchValue }
                    onChange={ this.handleChange }
                    onClick={ this.handleSubmit } />
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