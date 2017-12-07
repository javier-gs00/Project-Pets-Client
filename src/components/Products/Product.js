import React from 'react';
// import { Link } from 'react-router-dom'
import './products.css'

const Product = (props) => [
    <div>
    {props.results.length !== 0?
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
    :null}
    <div className="products-container">
        {props.results.map(result => {
            let price = result.price.toString()
            if (price.length > 4) {
                price = "$" + price.slice(0, 2) + "." + price.slice(-3)
            } else {
                price = "$" + price.slice(0, 1) + "." + price.slice(-3)
            }

            return (
                <div key={result._id} className="product-container">
                    {/* <a className="product-link" href={result.href} target="_blank"> */}
                        <div className="product-image">
                            <img src={result.image_href} alt={'Sin Imagen :('}/>
                        </div>
                        <div className="product-data">
                            <div className="product-data-block">
                                <span className="product-name">{result.name}</span>
                            </div>
                            <div className="product-data-block">
                                <span className="product-store">{result.store}</span>
                            </div>
                            <div className="product-data-block">
                                <span className="product-price">{price}</span>
                            </div>
                        </div>
                    {/* </a> */}
                </div>                
            )
        })}
    </div>
    </div>
]

// Manually replace hex values. Though hexToString correctly parses hex values,
// for some reason they don't get displayed in the Browser
// function parseHex (str) {
//     return str
//     .replace(/&#x2013;/gi, ' ')
//     .replace(/&#xa0;/gi, ' ')
//     .replace(/&#xc4;/gi, 'Á')
//     .replace(/&#xe1;/gi, 'á')
//     .replace(/&#xc9;/gi, 'É')
//     .replace(/&#xe9;/gi, 'é')
//     .replace(/&#xcd;/gi, 'Í')
//     .replace(/&#xed;/gi, 'í')
//     .replace(/&#xd3;/gi, 'Ó')
//     .replace(/&#xF3;/gi, 'ó')
//     .replace(/&#xda;/gi, 'Ú')
//     .replace(/&#xfa;/gi, 'ú')
//     .replace(/&#xdc;/gi, 'Ü')
//     .replace(/&#xfc;/gi, 'ü')
//     .replace(/&#xd1;/gi, 'Ñ')
//     .replace(/&#xf1;/gi, 'ñ')
// }

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

export default Product;