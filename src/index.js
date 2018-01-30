import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'
import './style.css'

import fontawesome from '@fortawesome/fontawesome'
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faSearch, faSpinner)

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'))
