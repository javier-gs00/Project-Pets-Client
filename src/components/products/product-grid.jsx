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
        const activeStoreFilters = []
        stores.filter(store => {
            if (store.checked) {activeStoreFilters.push(store.id)}
        })

        const products = this.props.results.map(result => {
            if (activeStoreFilters.indexOf(result.store) !== -1) {
                return (<ProductItem key={result._id} result={result}/>)
            }
        })

        return (
            <div>
                <button onClick={this.handleFiltersDisplay}>Filtrar</button>
                {results.length > 0 
                    ? <ProductFilter 
                            stores={stores} 
                            handleFilterClick={this.handleStoreFilterClick}
                            storeFilter={this.props.storeFilter}
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