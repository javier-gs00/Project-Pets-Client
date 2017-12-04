const productionRoute = 'https://project-pets-api.herokuapp.com'
// const localhostRoute = 'http://localhost:3001'

function checkStatus (response) {
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

function search (query, cb) {
    console.log('Search query sent...')
    return fetch(`${productionRoute}/api/product?query=${query}`, {
        accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

const Client = { search }
export default Client