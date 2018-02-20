import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import Loading from './products/loading'

// Containers
import Header from './header/header'
import NavContainer from './nav/nav-container'
import MenusContainer from './menus/menus-container'

const AsyncProductContainer = Loadable({
  loader: () => import('./products/product-container'),
  loading: Loading
})

const AsyncStoreContainer = Loadable({
  loader: () => import('./stores/store-container'),
  loading: Loading
})

const AsyncSingleStoreView = Loadable({
  loader: () => import('./stores/store-view'),
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
      <Provider store={this.props.store}>
        <BrowserRouter>
          <div>
              <Header activeRoute={activeRoute}/>
              <NavContainer activeRoute={activeRoute} />
              <Switch>
                <Redirect exact from="/" to="/productos" />
                <Route path='/productos' render={ props => <AsyncProductContainer getActiveRoute={this.getActiveRoute} {...props} />} />
                <Route exact path='/tiendas' render={ props => <AsyncStoreContainer getActiveRoute={this.getActiveRoute} {...props} />}  />
                <Route path='/tiendas/:name' render={ props => <AsyncSingleStoreView getActiveRoute={this.getActiveRoute} {...props} />}  />
                <Route exact path="/menu" render={ props => <MenusContainer getActiveRoute={this.getActiveRoute} {...props} />} />
                <Redirect to="/" />
              </Switch>
          </div>
      </BrowserRouter>
    </Provider>
    )
  }
}

export default App
