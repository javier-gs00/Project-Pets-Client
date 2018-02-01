import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductItem from './product-item'
import ProductFilter from './product-filter'
import './products.css'

class ProductGrid extends Component {
    handleFiltersDisplay = e => {
        if (this.props.results.length > 0) {
            if (document.getElementById('filters').classList.contains('hidden')){
                return document.getElementById('filters').classList.remove('hidden')
            } else {
                return document.getElementById('filters').classList.add('hidden')
            }
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
        const { results, stores, pets, categories } = this.props
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
        // Get the products matching the active store filters
        const products = this.props.results
            .filter(product => activeStoreFilters.indexOf(product.store) !== -1)
            .filter(product => activePetFilters.indexOf(product.animal) !== -1)
            .filter(product => activeCategoryFilters.indexOf(product.category) !== -1)
            .map(product => <ProductItem key={product._id} result={product}/>)

        return (  results.length > 0
            ? <div>
                <button className="btn filter-toggle bg-darkamber" onClick={this.handleFiltersDisplay}>FILTROS</button>
                <ProductFilter 
                    stores={stores}
                    pets={pets}
                    categories={categories}
                    handleStoreFilterChange={this.handleStoreFilterChange}
                    handlePetFilterChange={this.handlePetFilterChange}
                    handleCategoryFilterChange={this.handleCategoryFilterChange}/> 
                <div className="products-container">
                    { products }
                </div>
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