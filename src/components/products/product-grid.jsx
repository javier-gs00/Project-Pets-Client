import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductItem from './product-item'
import ProductFilter from './product-filter'

class ProductGrid extends Component {
    navigate = e => {
        const { activePage, changePage } = this.props
        const newPage = e.currentTarget.innerHTML
        console.log(newPage)
        if (newPage === '&lt;') {
            window.scrollTo(0, 0)
            return changePage(activePage - 1)
        } else if (newPage === '&gt;') {
            window.scrollTo(0, 0)
            return changePage(activePage + 1)
        } else {
            window.scrollTo(0, 0)
            return changePage(newPage - 1)
        }
    }
    calculatePages = products => {
        const { activePage } = this.props
        console.log(products.length)
        if (products.length <= 20) return [<button onClick={this.navigate}>1</button>]

        // calculate the number of pages
        const quantity = (Math.floor(products.length / 20)) + 1
        let buttonsArray = []
        // calculate the values of each navigation button
        buttonsArray.push(activePage !== 0
            ? <button onClick={this.navigate}>{'<'}</button>
            : null)
        buttonsArray.push(<button
            className={activePage === 0 ? 'products-nav-active' : null }
            onClick={this.navigate}>{activePage === 0 ? '1' : activePage}</button>) 
        buttonsArray.push(quantity < 3
            ? <button 
                className={activePage !== 0 && activePage === quantity - 1 ? 'products-nav-active' : null }
                onClick={this.navigate}>{activePage === 0 ? '2' : activePage + 1}</button>
            : <button 
                className={activePage !== 0 && activePage !== quantity - 1 ? 'products-nav-active' : null }
                onClick={this.navigate}>{activePage === 0 ? '2' : activePage + 1}</button>) 
        buttonsArray.push(quantity >= 3
            ? <button
                className={activePage === quantity - 1 ? 'products-nav-active' : null }
                onClick={this.navigate}>{activePage === 0 ? '3' : activePage + 2}</button>
            : null)
        buttonsArray.push(activePage !== quantity - 1
            ? <button onClick={this.navigate}>{'>'}</button>
            : null)
        return buttonsArray
    }

    handleFiltersDisplay = e => {
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

    handleStoreFilterChange = e => (
        this.props.onStoreFilterChange({
            id: e.target.id,
            checked: e.target.checked
        })
    )

    handlePetFilterChange = e => (
        this.props.onPetFilterChange({
            id: e.target.id,
            checked: e.target.checked
        })
    )

    handleCategoryFilterChange = e => (
        this.props.onCategoryFilterChange({
            id: e.target.id,
            checked: e.target.checked
        })
    )

    render() {
        const { results, activePage, stores, pets, categories } = this.props
        // Get the checked store filters and put them in an array
        const activeStoreFilters = stores
            .filter(store => store.checked)
            .map(store => store.id)
        // Get the checked pet filters and put them in an array
        const activePetFilters = pets
            .filter(pet => pet.checked)
            .map(pet => pet.id)
        // Get the checked category filters and put them in an array
        const activeCategoryFilters = categories
            .filter(category => category.checked)
            .map(category => category.id)
        // Calculate page ranges
        const start = activePage === 0 ? 0 : 20*activePage
        const end = activePage === 0 ? 20 : 20*activePage + 20 
        // Get the products matching the active store filters
        const totalProducts = this.props.results
            .filter(product => activeStoreFilters.indexOf(product.store) !== -1)
            .filter(product => activePetFilters.indexOf(product.animal) !== -1)
            .filter(product => activeCategoryFilters.indexOf(product.category) !== -1)
            
        const products = totalProducts.slice(start, end).map(product => <ProductItem key={product._id} result={product}/>)
        
        const pages = this.calculatePages(totalProducts)

        return (  results.length > 0
            ? <div className="products-container">
                <ProductFilter 
                    stores={stores}
                    pets={pets}
                    categories={categories}
                    handleFiltersDisplay={this.handleFiltersDisplay}
                    handleStoreFilterChange={this.handleStoreFilterChange}
                    handlePetFilterChange={this.handlePetFilterChange}
                    handleCategoryFilterChange={this.handleCategoryFilterChange}/>
                <div className="products-display-container" >
                    <div className="products-grid-container">
                        { products }
                    </div>
                    <div className="products-nav-container">
                        <div className="products-nav">
                            {/* <button>{'<'}</button>
                            <button className="products-nav-active">{'1'}</button>
                            <button>{'2'}</button>
                            <button>{'3'}</button>
                            <button>{'4'}</button>
                            <button>{'5'}</button>
                            <button>{'>'}</button> */}
                            {pages.map(button => button)}
                        </div>
                    </div>
                </div>
                {/* <div className="ads-banner-container"></div> */}
            </div>
            : <div></div>
        )
    }
}

ProductGrid.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
    stores: PropTypes.arrayOf(PropTypes.object),
    pets: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.object),
    onStoreFilterChange: PropTypes.func.isRequired,
    onPetFilterChange: PropTypes.func.isRequired,
    onCategoryFilterChange: PropTypes.func.isRequired
}

export default ProductGrid

// Transforms a string that contains hex NCR code to a normal string
// function hexToString (inputStr) {
//     // Look for &# and separate the string in two. Then look for a ";"" and separate the string in two again.
//     // Repeat until you have every expression that starts with &# and ends with ";""
//     // For every expression captured replace &# with a 0 and erase the ";"
//     // Transform the resulting expressions using fromCharCode and concatenate the resulting string
//     // console.log('========= InputStr')
//     // console.log(inputStr)
//     inputStr = inputStr.replace('&#x2013;', '-')
//     let startStr = '&#'
//     let endStr = ';'
//     let start = inputStr.indexOf(startStr)
//     let end = inputStr.indexOf(endStr)
//     if (start > 0) {
//         let firstPart = inputStr.slice(0, start) 
//         let secondPart = inputStr.slice(start, end + 1)
//         secondPart = secondPart.replace('&#', '0').replace(';', '')
//         let thirdPart = inputStr.slice(end + 1)
//         // console.log('===== First part is: ')
//         console.log(firstPart)
//         // console.log('===== SEcond part is: ')
//         console.log(secondPart)
//         console.log(hex2b(secondPart).length)
//         // console.log('===== Third part is: ')
//         console.log(thirdPart)
//         let newString = firstPart + hex2b(secondPart).slice(1) + thirdPart
//         // console.log('===== Result is')
//         console.log(newString)
//         hexToString(newString)
//         // let rucursive = newString.indexOf(startStr)
//         // if (rucursive > 0) { 
//         //     hexToString(newString)
//         // } else {
//         //     console.log('check 1')
//         //     return newString
//         // }
//     } else {
//         // console.log('check 2')
//         return inputStr
//     }
// }

// function hex2b(hex) {
//     var str = '';
//     for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
//     return str;
// }