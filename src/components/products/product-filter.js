import React from 'react'
import PropTypes from 'prop-types'

const ProductFilter = props => {
    let storeFilters = props.stores.map((store, index) => {
        return (
            <div key={index} className="filter">
                <span className="filter-name">{store.id}</span>
                <input 
                    type="checkbox" 
                    id={store.id} 
                    className="cbx hidden"
                    checked={store.checked}
                    onChange={props.handleStoreFilterChange}/>
                <label htmlFor={store.id} className="lbl"></label>
            </div>
        )
    })

    let petFilters = props.pets.map((pet, index) => {
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
                        onChange={props.handlePetFilterChange}/>
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
                        onChange={props.handlePetFilterChange}/>
                    <label htmlFor={pet.id} className="lbl"></label>
                </div>
            )
        }
    })

    let categoryFilters = props.categories.map((category, index) => {
        return (
            <div key={index} className="filter">
                <span className="filter-name">{capitalizeFirstLetter(category.id)}</span>
                <input 
                    type="checkbox" 
                    id={category.id} 
                    className="cbx hidden"
                    checked={category.checked}
                    onChange={props.handleCategoryFilterChange}/>
                <label htmlFor={category.id} className="lbl"></label>
            </div>
        )
    })

    // Determine if the viewport is wide enough to show the filters div open
    // Right now is set to show it only for hd notebook displays and above
    let showFiltersDiv = document.getElementById("main").offsetWidth > 1200 ? true : false

    return (
        <div id="filters" className={"filters-container " + (showFiltersDiv ? '' : 'hidden')} >
            <span className="filter-title">Tiendas</span>
            {storeFilters}
            <span className="filter-title">Mascotas</span>
            {petFilters}
            <span className="filter-title">Categoría</span>
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
    )
}

ProductFilter.propTypes = {
    stores: PropTypes.arrayOf(PropTypes.object),
    pets: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.object),
    handleStoreFilterChange: PropTypes.func.isRequired,
    handlePetFilterChange: PropTypes.func.isRequired,
    handleCategoryFilterChange: PropTypes.func.isRequired,
}

export default ProductFilter

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}