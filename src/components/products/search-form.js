import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { apiProductsSearch } from '../../api'
import { connect } from 'react-redux'

import { startRotatingSpinner, addProducts  } from '../../actions/actions'

const mapDispatchToProps = {
    startRotatingSpinner: startRotatingSpinner,
    addProducts: addProducts
}

const searchForm = props => {
    const handleInputKeyPress = e => e.key === 'Enter' ? handleSubmit() : false

    const handleSubmit = () => {
        const { history, startRotatingSpinner, addProducts } = props
        const searchValue = document.getElementById('search').value
        if (searchValue === "") {
            return this.props.handleInputTextChange(searchValue)
        } else {
            startRotatingSpinner()
            return apiProductsSearch(searchValue)
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


    return (
        <div className="search-container">
            <div className="search-input-container">
                <input
                    type="text" 
                    id="search" 
                    placeholder="¿Qué buscas?"
                    onKeyPress={handleInputKeyPress} />
                <button 
                    className="icon-search"
                    onClick={handleSubmit}>
                    <FontAwesomeIcon icon="search" />
                </button>
            </div>
        </div>
    )
}

searchForm.propTypes = {
    history: PropTypes.object.isRequired,
    addProducts: PropTypes.func.isRequired,
    startRotatingSpinner: PropTypes.func.isRequired
}

const SearchForm = connect(null, mapDispatchToProps)(searchForm)

export default SearchForm
