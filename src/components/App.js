import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// Containers
import NavContainer from './nav/nav-container.jsx'
import ProductContainer from './products/product-container.jsx'
import StoreContainer from './stores/store-container.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <NavContainer />
        <Switch>
            <Route exact path='/' component={ProductContainer} />
            <Route exact path='/tiendas' component={StoreContainer} />
        </Switch>
      </div>
    )
  }
}

export default App;
