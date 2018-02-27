import React from 'react'
import PropTypes from 'prop-types'

const ProductNav = ({ activePage, filteredProductsFoundLength, handleActivePageChange }) => {
    let buttonsArray = []
    if (filteredProductsFoundLength <= 20) return (
        <div className="products-nav-container" id="products-nav">
            <div className="products-nav">
                <button key="0" onClick={handleActivePageChange}>1</button>
                </div>
        </div>
    )
    // calculate the number of pages
    const pageQuantity = filteredProductsFoundLength % 20 === 0 
        ? Math.floor(filteredProductsFoundLength / 20)
        : Math.floor(filteredProductsFoundLength / 20) + 1
    // calculate the values of each navigation button
    buttonsArray.push(activePage !== 1
        ? <button key="0" onClick={handleActivePageChange}>{'<'}</button>
        : null)
    buttonsArray.push(<button key="1"
        className={activePage === 1 ? 'products-nav-active' : null }
        onClick={handleActivePageChange}>{ activePage === 1
            ? 1
            : activePage === 2
            ? 1
            : activePage !== 2 && activePage === pageQuantity
            ? activePage -2
            : activePage - 1 }</button>) 
    buttonsArray.push(pageQuantity > 1
        ? <button key="2"
            className={activePage !== 1 && activePage !== pageQuantity
                ? 'products-nav-active'
                : activePage === 2 && pageQuantity === 2
                ? 'products-nav-active'
                : null }
            onClick={handleActivePageChange}>{ activePage === pageQuantity && pageQuantity === 2
                ? 2
                : activePage === pageQuantity && pageQuantity !== 2
                ? activePage - 1
                : activePage === 1
                ? 2
                : activePage }</button>
        : null ) 
    buttonsArray.push(pageQuantity > 2
        ? <button key="3"
            className={activePage === pageQuantity ? 'products-nav-active' : null }
            onClick={handleActivePageChange}>{ activePage === pageQuantity
                ? pageQuantity
                : activePage === 1
                ? 3
                : activePage + 1 }</button>
        : null)
    buttonsArray.push(activePage !== pageQuantity
        ? <button key="4" onClick={handleActivePageChange}>{'>'}</button>
        : null)

    return (
        <div className="products-nav-container" id="products-nav">
            <div className="products-nav">
                { buttonsArray.map(button => button) }
            </div>
        </div>
    )
}

ProductNav.propTypes = {
    activePage: PropTypes.number.isRequired,
    filteredProductsFoundLength: PropTypes.number.isRequired,
    handleActivePageChange: PropTypes.func.isRequired
}

export default ProductNav