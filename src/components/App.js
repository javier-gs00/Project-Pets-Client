import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './products/loading'

// Containers
import Header from './header/header'
import NavContainer from './nav/nav-container.jsx'
// import ProductContainer from './products/product-container.jsx'
// import ProductView from './products/product-view.jsx'
// import StoreContainer from './stores/store-container.jsx'
// import SingleStoreContainer from './stores/store-view'
import MenusContainer from './menus/menus-container.jsx'

const AsyncProductContainer = Loadable({
  loader: () => import('./products/product-container'),
  loading: Loading
})

const AsyncSingleProductView = Loadable({
  loader: () => import('./products/product-view.jsx'),
  loading: Loading
})

const AsyncStoreContainer = Loadable({
  loader: () => import('./stores/store-container.jsx'),
  loading: Loading
})

const AsyncSingleStoreView = Loadable({
  loader: () => import('./stores/store-view.jsx'),
  loading: Loading
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      activeRoute: ''
    }
  }

  getActiveRoute = currentRoute => this.setState({ activeRoute: currentRoute })

  render() {
    const { activeRoute } = this.state

    return (
      <div>
        <Header activeRoute={activeRoute}/>
        <NavContainer activeRoute={activeRoute} />
        <Switch>
          <Redirect exact from="/" to="/productos" />
          <Route exact path='/productos' render={ props => <AsyncProductContainer getActiveRoute={this.getActiveRoute} {...props} />} />
          <Route path='/productos/:id' render={ props => <AsyncSingleProductView getActiveRoute={this.getActiveRoute} {...props} />} />
          <Route exact path='/tiendas' render={ props => <AsyncStoreContainer getActiveRoute={this.getActiveRoute} {...props} />}  />
          <Route path='/tiendas/:name' render={ props => <AsyncSingleStoreView getActiveRoute={this.getActiveRoute} {...props} />}  />
          <Route exact path="/menu" render={ props => <MenusContainer getActiveRoute={this.getActiveRoute} {...props} />} />
        </Switch>
      </div>
    )
  }
}

export default App
