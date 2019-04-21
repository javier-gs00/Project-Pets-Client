import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Pages from './pages/pages'

// Containers
import Header from './components/header/header'
import NavContainer from './components/nav/nav-container'

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
            <Header activeRoute={activeRoute} />
            <NavContainer activeRoute={activeRoute} />
            <Pages getActiveRoute={this.getActiveRoute} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
