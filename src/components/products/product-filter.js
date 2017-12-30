import React from 'react'

const ProductFilter = props => {
    let storeFilters = props.stores.map(store => {
        return (
            <div className="filter">
                <input 
                    type="checkbox" 
                    id={store.id} 
                    className="cbx hidden"
                    checked={store.checked}
                    onChange={props.handleStoreFilterChange}/>
                <label for={store.id} className="lbl"></label>
                <span className="filter-name">{store.id}</span>
            </div>
        )
    })

    return (
        <div id="filters" className="filters-container">
            <span className="filter-title">Tiendas</span>
            {storeFilters}
            <span className="filter-title">Ordenar</span>
            <div className="filter">
                <input type="checkbox" id="alphabet-filter" className="cbx hidden"/>
                <label for="alphabet-filter" className="lbl"></label>
                <span className="filter-name" onClick={props.handleFilterClick}>A-z</span>
            </div>
            <div className="filter">
                <input type="checkbox" id="price-filter" className="cbx hidden"/>
                <label for="price-filter" className="lbl"></label>
                <span className="filter-name" onClick={props.handleFilterClick}>Precio: Mayor a menor</span>
            </div>
        </div>
    )
}

export default ProductFilter