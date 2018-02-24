import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const SearchForm = props => {
    return (
        <div className="search-container">
            <div className="search-input-container">
                <input
                    type="text" 
                    id="search" 
                    placeholder="¿Qué buscas?"
                    onKeyPress={props.onKeyPress} />
                <button 
                    className="icon-search"
                    onClick={props.onClick}>
                    <FontAwesomeIcon icon="search" />
                </button>
            </div>
        </div>
    )
}

export default SearchForm