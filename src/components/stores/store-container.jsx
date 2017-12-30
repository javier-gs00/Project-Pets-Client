import React, { Component } from 'react'
import Client from '../../api'
import StoreGrid from './store-grid'
import './stores.css'

class StoreContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stores: []
        }
    }

    componentDidMount() {
        Client.getStores(results => {
            this.setState({stores: results})
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

export default StoreContainer