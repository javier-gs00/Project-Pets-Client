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
                    onKeyPress={props.onKeyPress} />
                <button 
                    className="icon-search"
                    onClick={props.onClick}>
                    <FontAwesomeIcon icon="search" />
                </button>
            </div>
            {props.totalProductsFoundLength
            ? <div className="search-text-container">
                <span>
                    {props.filteredProductsFoundLength < props.totalProductsFoundLength
                    ? `Mostrando ${props.filteredProductsFoundLength} de ${props.totalProductsFoundLength} resultados`
                    : `Se encontraron ${props.totalProductsFoundLength} resultados para tú busqueda`}                    
                </span>
            </div>
            : null}
        </div>
    )
}

export default SearchForm