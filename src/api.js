function checkStatus(response) {
  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    // console.log('Check status succesful...')
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  // console.log(error)
  throw error
}

function parseJSON(response) {
  // console.log('Parsing response to json...')
  return response.json()
}

// Used to fetch products using a regular expression
function search(query, cb) {
  // console.log(`Search query sent...`)
  return fetch(`http://localhost:3001/api/product?query=${query}`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

export function apiFindProductById(id) {
  // console.log("search query sent...")
  let promise = Promise.resolve()
  promise = fetch(`http://localhost:3001/api/product/id/${id}`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)

  return promise.then(product => product)
}

export function findProductsByCategory(category, cb) {
  // console.log('search query sent')
  return fetch(`http://localhost:3001/api/product/category/${category}`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

// Used to fetch all the stores
export function apiGetStores(cb) {
  // console.log('Requesting stores...')
  return fetch(`http://localhost:3001/api/store`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
}

export function apiGetStoreByName(name) {
  // console.log("Search query sent...")
  let promise = Promise.resolve()
  promise = fetch(`http://localhost:3001/api/store/${name}`, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)

  return promise.then(store => store)
}

// Performs the search request on the API and returns
// an object containing the necessary objects for the state
// Default query is for when the component first loads
export function apiProductsSearch(query = 'royal canin maxi') {
  return new Promise(function(resolve, reject) {
    search(query, function(products) {
      // Define a text for the animal property of the products that have ""
      // This must be fixed in the spider that scrapes the content preferably
      // or in the back end before sending the results
      products = products.map(product =>
        product.animal === '' ? { ...product, animal: 'no especifica' } : product
      )
      const storeFilters = products
        // retrieve the store values from the results
        .map(result => result.store)
        // get an array with only the resulting stores
        .filter((store, index, self) => self.indexOf(store) === index)
        // Create the filter objects defaulting to true to show all the results at first
        .map(storeName => ({ id: storeName, checked: true, filterType: 'store' }))

      const petFilters = products
        .map(result => result.animal)
        .filter((pet, index, self) => self.indexOf(pet) === index)
        .map(petKind => ({ id: petKind, checked: true, filterType: 'pet' }))

      const categoryFilters = products
        .map(result => result.category)
        .filter((category, index, self) => self.indexOf(category) === index)
        .map(category => ({ id: category, checked: true, filterType: 'category' }))

      const filters = [...storeFilters, ...petFilters, ...categoryFilters]

      resolve({ products, filters })
      reject({})
    })
  })
}

export function apiGetProductsByCategory(category) {
  return new Promise(function(resolve, reject) {
    findProductsByCategory(category, function(products) {
      products = products.map(product =>
        product.animal === '' ? { ...product, animal: 'no especifica' } : product
      )
      const storeFilters = products
        // retrieve the store values from the results
        .map(result => result.store)
        // get an array with only the resulting stores
        .filter((store, index, self) => self.indexOf(store) === index)
        // Create the filter objects defaulting to true to show all the results at first
        .map(storeName => ({ id: storeName, checked: true, filterType: 'store' }))

      const petFilters = products
        .map(result => result.animal)
        .filter((pet, index, self) => self.indexOf(pet) === index)
        .map(petKind => ({ id: petKind, checked: true, filterType: 'pet' }))

      const categoryFilters = products
        .map(result => result.category)
        .filter((category, index, self) => self.indexOf(category) === index)
        .map(category => ({ id: category, checked: true, filterType: 'category' }))

      const filters = [...storeFilters, ...petFilters, ...categoryFilters]

      resolve({ products, filters })
      reject({})
    })
  })
}
