import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './loading.scss'

const LoadingScreen = () => (
  <div className="loading">
    <FontAwesomeIcon icon="spinner" spin size="3x" />
  </div>
)

export default LoadingScreen
