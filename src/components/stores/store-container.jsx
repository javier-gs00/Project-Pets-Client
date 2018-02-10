import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../api'
import StoreGrid from './store-grid'
// import './stores.css'

class StoreContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stores: []
        }
    }

    componentDidMount() {
        const { location } = this.props
        this.props.getActiveRoute(location.pathname)

        return Client.getStores(results => {
            this.setState({ 
                stores: results
             })
        })    
    }

    render() {
        return (
            <div className="main">
                <StoreGrid stores={this.state.stores} />
            </div>
        )
    }
}

StoreContainer.propTypes = {
    getActiveRoute: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
}

export default StoreContainer