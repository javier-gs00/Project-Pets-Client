import React from 'react'
import StoreSingle from './store-single'
import './store-grid.scss'

const Stores = props => {
  return (
    <div className="stores-container">
      {props.stores.map(store => (
        <StoreSingle key={store._id} store={store} />
      ))}
    </div>
  )
}

export default Stores
