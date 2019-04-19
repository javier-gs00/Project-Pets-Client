const api =
  process.env.NODE_ENV === 'http://localhost:3001/api' ? 'pending' : 'http://localhost:3001/api'

export async function apiFindProductById(id) {
  try {
    const response = await fetch(`${api}/product/id/${id}`, {
      accept: 'application/json'
    })
    const product = await response.json()
    return product
  } catch (err) {
    console.log(`An error ocurred retrieving the product with id ${id}. Err:`, err)
    return {}
  }
}

// Used to fetch all the stores
export async function apiGetStores(cb) {
  try {
    const response = await fetch(`${api}/store`, {
      accept: 'application/json'
    })
    const stores = await response.json()
    return stores
  } catch (err) {
    console.log('An error ocurred trying to retrieve the stores. Err:', err)
    return {}
  }
}

export async function apiGetStoreByName(name) {
  try {
    const response = await fetch(`${api}/store/${name}`, {
      accept: 'application/json'
    })
    const store = await response.json()
    return store
  } catch (err) {
    console.log(`An error ocurred retrieving the store ${name}. Err:`, err)
    return {}
  }
}

// Performs the search request on the API and returns
// an object containing the necessary objects for the state
// Default query is for when the component first loads
export async function apiProductsSearch(query = 'royal canin maxi') {
  try {
    const response = await fetch(`${api}/product?query=${query}`, {
      accept: 'application/json'
    })
    const rawProducts = await response.json()
    // Define a text for the animal property of the products that have ""
    // This must be fixed in the spider that scrapes the content preferably
    // or in the back end before sending the results
    const products = rawProducts.map(product =>
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

    return { products, filters }
  } catch (err) {
    console.log('An error ocurred searching for products. Err:', err)
    return {}
  }
}

export async function apiGetProductsByCategory(category) {
  try {
    const response = await fetch(`${api}/product/category/${category}`, {
      accept: 'application/json'
    })
    const rawProducts = await response.json()
    const products = rawProducts.map(product =>
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

    return { products, filters }
  } catch (err) {
    console.log('An error ocurred searching for products by category. Err:', err)
    return {}
  }
}
