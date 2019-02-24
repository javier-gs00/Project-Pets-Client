import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import projectPetsApp from './reducers/reducers'

import App from './components/App'
import './assets/style/style.css'
// import './style/style.less'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faAmbulance,
  faBars,
  faBuilding,
  faCar,
  faClock,
  faEnvelope,
  faFutbol,
  faGlobe,
  faMapMarker,
  faMedkit,
  faPaw,
  faPhone,
  faSearch,
  faSignInAlt,
  faSpinner,
  faShower,
  faSortNumericDown,
  faSortNumericUp,
  faThLarge,
  faUndoAlt,
  faUserMd,
  faUtensils
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faAngleDown,
  faAmbulance,
  faBars,
  faBuilding,
  faCar,
  faClock,
  faEnvelope,
  faFutbol,
  faGlobe,
  faMapMarker,
  faMedkit,
  faPaw,
  faPhone,
  faSearch,
  faSignInAlt,
  faSpinner,
  faShower,
  faSortNumericDown,
  faSortNumericUp,
  faThLarge,
  faUndoAlt,
  faUserMd,
  faUtensils
)

let store = createStore(projectPetsApp)

ReactDOM.render(<App store={store} />, document.getElementById('root'))
