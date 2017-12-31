import React from 'react'
import ProductItem from './product-item'
import ProductFilter from './product-filter'
import './products.css'

class ProductGrid extends React.Component {
    handleFiltersDisplay = e => {
        if (this.props.results.length > 0) {
            if (document.getElementById('filters').classList.contains('hidden')){
                document.getElementById('filters').classList.remove('hidden')
            } else {
                document.getElementById('filters').classList.add('hidden')
            }
        }
    }

    handleStoreFilterChange = e => {
        this.props.onStoreFilterChange({
            id: e.target.id,
            checked: e.target.checked
        })
    }

    render() {
        const results = this.props.results
        const stores = this.props.stores
        // Get the checked store filters and put them in an array
        const activeStoreFilters = stores
            .filter(store => store.checked)
            .map(store => store.id)
        // Get the products matching the active store filters
        const products = this.props.results
            .filter(product => activeStoreFilters.indexOf(product.store) !== -1)
            .map(product => <ProductItem key={product.id} result={product}/>)

        return (
            <div>
                <button className="btn filter-toggle" onClick={this.handleFiltersDisplay}>FILTRAR</button>
                {results.length > 0 
                    ? <ProductFilter 
                            stores={stores} 
                            handleStoreFilterChange={this.handleStoreFilterChange}/> 
                    : <span></span>}
                <div className="products-container">
                    {products}
                </div>
            </div>
        )
    }
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