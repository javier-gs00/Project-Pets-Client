import React from 'react'
import ProductItem from './product-item'
import './products.css'

const ProductGrid = (props) => [
    <div>
        {/* {props.results.length !== 0?
            <div className="filters-container">
                <div className="filter-container">
                    <label>Precio</label>
                    <button 
                        className="icon-filter">
                        <i className="fa fa-sort-amount-asc"></i>
                    </button>
                </div>
                <div className="filter-container">
                    <label>Tienda</label>
                    <button 
                        className="icon-filter">
                        <i className="fa fa-sort-alpha-desc"></i>
                    </button>
                </div>
            </div>
        :null} */}
        <div className="products-container">
            {props.results.map(result => {
                return (
                    < ProductItem result={ result }/>            
                )
            })}
        </div>
    </div>
]

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

export default ProductGrid