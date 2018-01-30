import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../api'
import StoreGrid from './store-grid'
import './stores.css'

class StoreContainer extends Component {
    static propTypes = {
        getActiveRoute: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    }

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

    handleInputChange = e => this.setState({ searchValue: e.target.value })

    render() {
        return (
            <div className="main">
                <StoreGrid stores={this.state.stores} />
            </div>
        )
    }
}

export default StoreContainer