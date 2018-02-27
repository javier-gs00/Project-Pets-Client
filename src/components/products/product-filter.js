import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from '@fortawesome/react-fontawesome'

const ProductFilter = props => {
    function createFilter(index, filter, handleFilterChange) {
        return (
            <div key={index} className="filter">
                <span className="filter-name">
                    {filter.id !== ''
                        ? capitalizeFirstLetter(filter.id)
                        : 'No especifica'}
                </span>
                <input 
                    type="checkbox" 
                    id={filter.id} 
                    className="cbx hidden"
                    checked={filter.checked}
                    onChange={handleFilterChange} />
                <label htmlFor={filter.id} className="lbl"></label>
            </div>
        )
    }

    let storeFilters = props.filters
        .filter(filter => filter.filterType === 'store')
        .map((store, index) => createFilter(index, store, props.handleFilterChange)
    )

    let petFilters = props.filters
        .filter(filter => filter.filterType === 'pet')
        .map((pet, index) => createFilter(index, pet, props.handleFilterChange)
    )

    let categoryFilters = props.filters
        .filter(filter => filter.filterType === 'category')
        .map((category, index) => createFilter(index, category, props.handleFilterChange))

    return (
        <div className="filters-table-container">
            <div className="filters-show-toggle" onClick={handleFiltersDisplay}>
                <FontAwesome icon="filter"/>
                <span id="filter-toggle-text">Mostrar Filtros</span>
                <FontAwesome icon="angle-down"/>
            </div>
            <div id="filters" className="filters-container">
                <span className="filter-title">Ordenar</span>
                <div className="filter">
                    <span className="filter-name">Precio</span>
                    <div className="filter-svg-container">
                        <div id="null_sort"
                            className="filter-svg-item"
                            onClick={props.handleSort}>
                            <FontAwesome icon="undo-alt" /></div>
                        <div id="desc_sort" 
                            className="filter-svg-item"
                            onClick={props.handleSort}>
                            <FontAwesome icon="sort-numeric-down" /></div>
                        <div id="asc_sort"
                            className="filter-svg-item"
                            onClick={props.handleSort}>
                            <FontAwesome icon="sort-numeric-up" /></div>
                    </div>
                </div>
                <span className="filter-title">Tiendas</span>
                {storeFilters}
                <span className="filter-title">Mascotas</span>
                {petFilters}
                { props.path.split('/')[1] === 'categorias'
                    ? null : <span className="filter-title">Categorías</span> }
                { props.path.split('/')[1] === 'categorias'
                    ? null : categoryFilters }
            </div>
        </div>
    )
}

ProductFilter.propTypes = {
    path: PropTypes.string.isRequired,
    handleSort: PropTypes.func.isRequired,
    handleFiltersDisplay: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object)
}

export default ProductFilter

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

function handleFiltersDisplay(e) {
    const filters = document.getElementById('filters')
    const toggleFilters = document.getElementsByClassName('filters-show-toggle')[0]
    const toggleFiltersText = document.getElementById('filter-toggle-text')
    if (filters.style.maxHeight) {
        filters.style.maxHeight = null
        toggleFilters.classList.remove('filters-rotated')
        toggleFilters.classList.add('filters-not-rotated')
        toggleFiltersText.innerHTML = 'Mostrar Filtros'
    } else {
        filters.style.maxHeight = filters.scrollHeight + "px"
        toggleFilters.classList.remove('filters-not-rotated')
        toggleFilters.classList.add('filters-rotated')
        toggleFiltersText.innerHTML = 'Ocultar Filtros'
    }
}