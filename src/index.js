import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import projectPetsApp from './reducers/reducers'

import App from './components/App'
// import './style.css'
import './assets/style/style.css'
// import './style/style.less'

import fontawesome from '@fortawesome/fontawesome'
import { faAngleDown, faAmbulance, faBars, faBuilding, faCar, faClock, faEnvelope,
    faGlobe, faMapMarker, faPaw, faPhone, faSearch, faSignInAlt, faSpinner, faShower,
    faSortNumericDown, faSortNumericUp, faThLarge, faUndoAlt, faUserMd } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faAngleDown, faAmbulance, faBars, faBuilding, faCar, faClock, faEnvelope,
    faGlobe, faMapMarker, faPaw, faPhone, faSearch, faSignInAlt, faSpinner, faShower,
    faSortNumericDown, faSortNumericUp, faThLarge, faUndoAlt, faUserMd)

let store = createStore(projectPetsApp)

ReactDOM.render(<App store={store}/>, document.getElementById('root'))
