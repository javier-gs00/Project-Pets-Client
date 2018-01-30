import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Containers
import NavContainer from './nav/nav-container.jsx'
import ProductContainer from './products/product-container.jsx'
import ProductView from './products/product-view.jsx'
import StoreContainer from './stores/store-container.jsx'
import MenusContainer from './menus/menus-container.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      activeRoute: ''
    }
  }

  getActiveRoute = currentRoute => {
    // console.log(currentRoute)
    return this.setState({ activeRoute: currentRoute })
  }

  render() {
    const { activeRoute } = this.state

    return (
      <div>
        <NavContainer activeRoute={activeRoute} />
        <Switch>
          <Redirect exact from="/" to="/productos" />
          <Route exact path='/productos' render={ props => <ProductContainer getActiveRoute={this.getActiveRoute} {...props} />} />
          <Route path='/productos/:id' component={ProductView} />
          <Route exact path='/tiendas' render={ props => <StoreContainer getActiveRoute={this.getActiveRoute} {...props} />}  />
          <Route exact path="/menu" render={ props => <MenusContainer getActiveRoute={this.getActiveRoute} {...props} />} />
        </Switch>
      </div>
    )
  }
}

export default App
