function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log('Check status succesful...')
        return response
    }
    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    console.log(error)
    throw error
}

function parseJSON(response) {
    console.log(response)
    console.log('Parsing response to json...')
    return response.json()
}

// Used to fetch products using a regular expression
function search(query, cb) {
    console.log('Search query sent...')
    return fetch(`/api/product?query=${query}`, {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function findProductById(id) {
    console.log("search query sent...")
    let promise = Promise.resolve()
    promise = fetch(`/api/product/id/${id}`, {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)

    return promise.then(product => product)
}

// Used to fetch one product by its id
function findOne(id, cb) {
    console.log('Search query sent...')
    return fetch(`/api/product/id/${id}`, {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// Used to fetch all the stores
function getStores(cb) {
    console.log('Requesting stores...')
    return fetch(`/api/store`, {
        accept: 'application/json'
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

function getStoreByName(name) {
    console.log("Search query sent...")
    let promise = Promise.resolve()
    promise = fetch(`/api/store/${name}`, {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)

    return promise.then(store => store)
}

const Client = { search, findOne, findProductById, getStores, getStoreByName }

export default Client