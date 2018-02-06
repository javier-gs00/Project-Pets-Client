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

        // Check if the store object is received from the previous page '/tiendas'
        // or an API call is needed to obtain it (route was typed in directly)
        if (location.state !== undefined) {
            return this.setState({ store: location.state.store })
        } else {
            return Client.getStoreByName(match.params.name)
            .then(store => this.setState({ store: store }))
        }
    }

    render() {
        const { store } = this.state
        console.log(store)
        let name, uri, imageUrl, imageFileName,
            email, phone, addresses, openHours,
            grooming, veterinary, urgency, physicalStore, productShipping

        if (!!store) {
            // Strings
            name = store.name
            uri = store.uri
            imageUrl = store.image_url
            imageFileName = store.image_file_name
            // Booleans
            grooming = store.grooming ? 'Servicio de peluqueria' : 'Sin servicio de peluqueria'
            veterinary = store.veterinary ? "Veterinaria" : "Sin Veterinaria"
            urgency = store.urgency ? "Con servicio de urgencias" : "Sin servicio de urgencias"
            physicalStore = store.physical_store ? 'Posee tienda' : 'Sin tienda'
            productShipping = store.product_shipping ? 'Envío a domicilio' : 'Sin envío a domicilio'

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
                    <img src={imageUrl} alt={imageFileName} />
                    <p>{name}</p>
                    <p>Sitio web: {uri}</p>
                    <p>{grooming}</p>
                    <p>{veterinary}</p>
                    <p>{urgency}</p>
                    <p>{physicalStore}</p>
                    <p>{productShipping}</p>
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