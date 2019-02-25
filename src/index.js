import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import projectPetsApp from './reducers/reducers'
import App from './components/App'
import './font-awsesome-icons'
import './assets/style/style.css'
// import './style/style.less'

let store = createStore(projectPetsApp)

ReactDOM.render(<App store={store} />, document.getElementById('root'))
