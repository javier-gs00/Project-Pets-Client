function parsePrice(intPrice) {
    let price = intPrice.toString()
    if (price.length > 6) {
        price = "$" + price.slice(0, 1) + "." + price.slice(1, 4) + "." + price.slice(-3)
    } else if (price.length > 5) {
        price = "$" + price.slice(0, 3) + "." + price.slice(-3)
    } else if (price.length > 4) {
        price = "$" + price.slice(0, 2) + "." + price.slice(-3)
    } else if (price.length > 3) {
        price = "$" + price.slice(0, 1) + "." + price.slice(-3)
    } else {
        price = "$" + price
    }
    return price
}

module.exports = {
    parsePrice
}