import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const SearchForm = props => {
    return (
        <div className="search-container">
            <div className="search-input-container">
                <input
                    className="bg-white font-large font-normal"
                    type="search" 
                    id="search" 
                    placeholder="¿Qué buscas?"
                    autoFocus
                    value={props.value}
                    onChange={props.onChange} 
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