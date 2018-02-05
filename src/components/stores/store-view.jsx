import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../products/loading'
import Client from '../../api'

class StoreView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: ''
        }
    }

    componentDidMount() {
        const { location, match } = this.props
        this.props.getActiveRoute("/" + location.pathname.split("/")[1])

        if (location.state !== undefined) {
            return this.setState({ store: location.state.store })
        } else {
            return Client.getStoreByName(match.params.name)
            .then(store => this.setState({ store: store }))
        }
    }

    render() {
        const { store } = this.state
        let email, phone, addresses, openHours

        if (!!store) {
            email = store.email.map((email, index) => (<li key={index}>
                {email.name} - {email.uri}
            </li>))

            phone = store.phone.map((phone, index) => (<li key={index}>
                {phone.name} - {phone.number}
            </li>))

            addresses = store.address.map((address, index) => (<li key={index}>
                {address.street} - {address.commune} - {address.cityTown} / {address.region}
            </li>))

            openHours = store.open_hours.map((hours, index) => (<li key={index}>
                {hours.range} - {hours.open} - {hours.close}
            </li>))
        }

        return (
            <div className='main'>
                {store 
                ? <div>
                    <ul>
                        {phone}
                    </ul>
                    <ul>
                        {email}
                    </ul>
                    <ul>
                        {addresses}
                    </ul>
                    <ul>
                        {openHours}
                    </ul>
                </div>
                : <Loading />}
            </div>
        )
    }

}

StoreView.propTypes = {
    getActiveRoute: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
}

export default StoreView