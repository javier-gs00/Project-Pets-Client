import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Header from '../components/header/header'

// Containers
import NavContainer from './nav/nav-container.jsx'
import SearchContainer from './search/search-container.jsx'
// import ProductsContainer from './products/products-container.js'
// import StoresContainer from './store/stores-container.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NavContainer />
        <Switch>
            <Route exact path='/' component={SearchContainer} />
            {/* <Route exact path='/productos' component={ProductsContainer} />
            <Route exact path='/tiendas' component={StoresContainer} /> */}
        </Switch>
      </div>
    )
  }
}

export default App;
