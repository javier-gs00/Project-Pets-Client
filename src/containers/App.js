import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import NavContainer from '../containers/Nav/NavContainer.js';
import Header from '../components/Header/Header.js';

// Containers
import SearchContainer from './Search/SearchContainer.js'
import ProductsContainer from './Products/ProductsContainer.js'
import StoresContainer from './Stores/StoresContainer.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NavContainer />
        <Switch>
            <Route exact path='/' component={SearchContainer} />
            <Route exact path='/productos' component={ProductsContainer} />
            <Route exact path='/tiendas' component={StoresContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
