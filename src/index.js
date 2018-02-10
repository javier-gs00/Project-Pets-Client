import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

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

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'))
