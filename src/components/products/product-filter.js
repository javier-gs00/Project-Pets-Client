import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from '@fortawesome/react-fontawesome'

const ProductFilter = props => {
    const disableStoreFilters = props.storeFilters.length > 1 ? false : true
    let storeFilters = props.storeFilters.map((store, index) => {
        return (
            <div key={index} className="filter">
                <span className="filter-name">{store.id}</span>
                <input 
                    type="checkbox" 
                    id={store.id} 
                    className="cbx hidden"
                    checked={store.checked}
                    onChange={props.handleStoreFilterChange}
                    disabled={disableStoreFilters} />
                <label htmlFor={store.id} className="lbl"></label>
            </div>
        )
    })

    const disablePetFilters = props.petFilters.length > 1 ? false : true
    let petFilters = props.petFilters.map((pet, index) => {
        // Check if the product has a registered pet kind. This is because not
        // all products are for a specific kind a pet
        if (pet.id !== '') {
            return (
                <div key={index} className="filter">
                    <span className="filter-name">{capitalizeFirstLetter(pet.id)}</span>
                    <input 
                        type="checkbox" 
                        id={pet.id} 
                        className="cbx hidden"
                        checked={pet.checked}
                        onChange={props.handlePetFilterChange}
                        disabled={disablePetFilters} />
                    <label htmlFor={pet.id} className="lbl"></label>
                </div>
            )
        } else {
            return (
                <div key={index} className="filter">
                    <span className="filter-name">{"Indefinido"}</span>
                    <input 
                        type="checkbox" 
                        id={pet.id} 
                        className="cbx hidden"
                        checked={pet.checked}
                        onChange={props.handlePetFilterChange}
                        disabled={disablePetFilters} />
                    <label htmlFor={pet.id} className="lbl"></label>
                </div>
            )
        }
    })

    const disableCategoryFilters = props.categoryFilters.length > 1 ? false : true
    let categoryFilters = props.categoryFilters.map((category, index) => {
        return (
            <div key={index} className="filter">
                <span className="filter-name">{capitalizeFirstLetter(category.id)}</span>
                <input 
                    type="checkbox" 
                    id={category.id} 
                    className="cbx hidden"
                    checked={category.checked}
                    onChange={props.handleCategoryFilterChange}
                    disabled={disableCategoryFilters} />
                <label htmlFor={category.id} className="lbl"></label>
            </div>
        )
    })

    return (
        <div className="filters-table-container">
            <div className="filters-show-toggle" onClick={props.handleFiltersDisplay}>
                <FontAwesome icon="filter"/>
                <span id="filter-toggle-text">Mostrar Filtros</span>
                <FontAwesome icon="angle-down"/>
            </div>
            {/* <div id="filters" className={"filters-container " + (showFiltersDiv ? '' : 'hidden')} > */}
            <div id="filters" className="filters-container">
                <span className="filter-title">Tiendas</span>
                {storeFilters}
                <span className="filter-title">Mascotas</span>
                {petFilters}
                <span className="filter-title">Categorías</span>
                {categoryFilters}
                {/* <span className="filter-title">Ordenar</span>
                <div className="filter">
                    <input type="checkbox" id="alphabet-filter" className="cbx hidden"/>
                    <label for="alphabet-filter" className="lbl"></label>
                    <span className="filter-name" onClick={props.handleFilterClick}>A-z</span>
                </div>
                <div className="filter">
                    <input type="checkbox" id="price-filter" className="cbx hidden"/>
                    <label for="price-filter" className="lbl"></label>
                    <span className="filter-name" onClick={props.handleFilterClick}>Precio: Mayor a menor</span>
                </div> */}
            </div>
        </div>
    )
}

ProductFilter.propTypes = {
    storeFilters: PropTypes.arrayOf(PropTypes.object),
    petFilters: PropTypes.arrayOf(PropTypes.object),
    categoryFilters: PropTypes.arrayOf(PropTypes.object),
    handleStoreFilterChange: PropTypes.func.isRequired,
    handlePetFilterChange: PropTypes.func.isRequired,
    handleCategoryFilterChange: PropTypes.func.isRequired,
}

export default ProductFilter

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}