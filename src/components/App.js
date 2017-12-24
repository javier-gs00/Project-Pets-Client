import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// Containers
import NavContainer from './nav/nav-container.jsx'
import SearchContainer from './search/search-container.jsx'
// import ProductsContainer from './products/products-container.js'
import StoreContainer from './stores/store-container.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <NavContainer />
        <Switch>
            <Route exact path='/' component={SearchContainer} />
            {/* <Route exact path='/productos' component={ProductsContainer} /> */}
            <Route exact path='/tiendas' component={StoreContainer} />
        </Switch>
      </div>
    )
  }
}

export default App;
