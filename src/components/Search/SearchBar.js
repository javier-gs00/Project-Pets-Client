import React from 'react'

const SearchBar = props => [
    <div className="search-container">
        <div className="search-input-container">
            <input 
                type="search" 
                id="search" 
                placeholder="¿Qué buscas?"
                value={props.value}
                onChange={props.onChange}
                />
            <button 
                className="icon-search"
                onClick={props.onClick}>
                <i className="fa fa-search"></i>
            </button>
        </div>
    </div>
]

export default SearchBar