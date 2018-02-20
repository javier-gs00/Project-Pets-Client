import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import projectPetsApp from './reducers/reducers'

import App from './components/App'
// import './style.css'
import './assets/style/style.css'

import fontawesome from '@fortawesome/fontawesome'
import { faAngleDown, faAmbulance, faBuilding, faCar, faClock, faEnvelope,
    faGlobe, faMapMarker, faPhone, faSearch, faSignInAlt, faSpinner, faShower,
    faUserMd } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faAngleDown, faBuilding, faAmbulance, faCar, faClock, faEnvelope,
    faGlobe, faMapMarker, faPhone, faSearch, faSignInAlt, faSpinner, faShower,
    faUserMd)

let store = createStore(projectPetsApp)

ReactDOM.render(<App store={store}/>, document.getElementById('root'))
