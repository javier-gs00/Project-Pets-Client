import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// Containers
import NavContainer from './nav/nav-container.jsx'
import ProductContainer from './products/product-container.jsx'
import ProductView from './products/product-view.jsx'
import StoreContainer from './stores/store-container.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <NavContainer />
        <Switch>
          <Route exact path='/productos' component={ProductContainer} />
          <Route path='/productos/:id' component={ProductView} />
          <Route exact path='/tiendas' component={StoreContainer} />
        </Switch>
      </div>
    )
  }
}

export default App
