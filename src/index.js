import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import projectPetsApp from './reducers/reducers'
import App from './app'
import './font-awsesome-icons'
import './assets/style/style.scss'

let store = createStore(projectPetsApp)

ReactDOM.render(<App store={store} />, document.getElementById('root'))
