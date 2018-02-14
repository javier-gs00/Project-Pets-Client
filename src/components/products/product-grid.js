import React from 'react'
import PropTypes from 'prop-types'
import ProductFilter from './product-filter'

const ProductGrid = props => {
    const { products, pages, storeFilters, petFilters, categoryFilters } = props

    return ( products.length > 0
        ? <div className="products-container">
            <ProductFilter 
                stores={storeFilters}
                pets={petFilters}
                categories={categoryFilters}
                handleFiltersDisplay={props.handleFiltersDisplay}
                handleStoreFilterChange={props.handleStoreFilterChange}
                handlePetFilterChange={props.handlePetFilterChange}
                handleCategoryFilterChange={props.handleCategoryFilterChange}/>
            <div className="products-display-container" >
                <div className="products-grid-container">
                    { products }
                </div>
                <div className="products-nav-container">
                    <div className="products-nav">
                        {pages.map(button => button)}
                    </div>
                </div>
            </div>
            {/* <div className="ads-banner-container"></div> */}
        </div>
        : <div></div>
    )
}

ProductGrid.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.object),
    products: PropTypes.arrayOf(PropTypes.object),
    storeFilters: PropTypes.arrayOf(PropTypes.object),
    petFilters: PropTypes.arrayOf(PropTypes.object),
    categoryFilters: PropTypes.arrayOf(PropTypes.object),
    handleFiltersDisplay: PropTypes.func.isRequired,
    handleStoreFilterChange: PropTypes.func.isRequired,
    handlePetFilterChange: PropTypes.func.isRequired,
    handleCategoryFilterChange: PropTypes.func.isRequired
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
//         // console.log('===== Second part is: ')
//         console.log(secondPart)
//         console.log(hex2b(secondPart).length)
//         // console.log('===== Third part is: ')
//         console.log(thirdPart)
//         let newString = firstPart + hex2b(secondPart).slice(1) + thirdPart
//         // console.log('===== Result is')
//         console.log(newString)
//         hexToString(newString)
//         // let recursive = newString.indexOf(startStr)
//         // if (recursive > 0) { 
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