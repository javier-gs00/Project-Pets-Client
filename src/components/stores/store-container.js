import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addStores } from '../../actions/actions'
import { apiGetStores } from '../../api'
import StoreGrid from './store-grid'

const mapStateToProps = ({ stores }) => ({
  stores: stores.stores
})

const mapDispatchToProps = {
  addStores: addStores
}

class storeContainer extends Component {
  async componentDidMount() {
    const { stores, addStores, location } = this.props
    this.props.getActiveRoute(location.pathname)

    if (stores.length > 0) {
      return false
    } else {
      const stores = await apiGetStores()
      return addStores(stores)
    }
  }

  render() {
    return (
      <div className="main">
        <StoreGrid stores={this.props.stores} />
      </div>
    )
  }
}

const StoreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(storeContainer)

storeContainer.propTypes = {
  getActiveRoute: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  stores: PropTypes.array.isRequired
}

export default StoreContainer
