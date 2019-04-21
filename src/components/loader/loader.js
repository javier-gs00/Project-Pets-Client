import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './loader.scss'

const Loader = () => (
  <div className="loading">
    <FontAwesomeIcon icon="spinner" spin size="3x" />
  </div>
)

export default Loader
