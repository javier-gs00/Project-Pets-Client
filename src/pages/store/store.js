import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../../components/loader/loader'
import { apiGetStoreByName } from '../../api'
import './store.scss'

class StorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: ''
    }
  }

  componentDidMount() {
    const { location, match } = this.props
    this.props.getActiveRoute('/' + location.pathname.split('/')[1])

    // Check if the store object is received from the previous page '/tiendas'
    // or an API call is needed to obtain it (route was typed in directly)
    if (location.state !== undefined) {
      return this.setState({ store: location.state.store })
    } else {
      return apiGetStoreByName(match.params.name).then(store => this.setState({ store: store }))
    }
  }

  toggleContent = e => {
    const id = e.currentTarget.id
    const title = document.getElementById(id)
    const content = document.getElementById(id.replace('title', 'content'))
    if (content.style.maxHeight) {
      content.style.maxHeight = null
      content.style.borderTop = null
      title.classList.remove('store-rotated')
      title.classList.add('store-not-rotated')
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'
      content.style.borderTop = '1px solid #ddd'
      title.classList.remove('store-not-rotated')
      title.classList.add('store-rotated')
    }
  }

  render() {
    const { store } = this.state
    let name, imageUrl, email, phone, addresses, openHours

    if (store) {
      // Strings
      imageUrl = <img src={store.image_url} alt={store.name} />
      name = <h1>{store.name}</h1>

      phone = store.phone.map((phone, index) => (
        <div key={index} className="store-single-item-container phone-content">
          <div>
            <span>{phone.name}:</span>
          </div>
          <div>
            <span>{parsePhoneNumber(phone.number)}</span>
          </div>
        </div>
      ))

      email = store.email.map((email, index) => (
        <div key={index} className="store-single-item-container email-content">
          <span>{email.uri}</span>
        </div>
      ))

      addresses = store.address.map((address, index) => (
        <div key={index} className="store-single-item-container addresses-content">
          <span>
            {address.street}, {address.commune}, {address.cityTown}, {address.region}
          </span>
        </div>
      ))

      openHours = store.open_hours.map((hours, index) => (
        <div key={index} className="store-single-item-container openhours-content">
          <div>
            <span>{hours.range}:</span>
          </div>
          <div>
            <span>
              {hours.open} - {hours.close}
            </span>
          </div>
        </div>
      ))

      return (
        <div className="main">
          <div className="store-single-main-container">
            <div className="store-single-container">
              <div className="store-single-image">{imageUrl}</div>
              <div className="store-single-title-container">{name}</div>
              <div className="store-single-title-container">
                <FontAwesomeIcon
                  icon="globe"
                  style={store.url ? { color: '#ffa000' } : { color: '#ddd' }}
                />
                <a href={store.url} target="_blank" rel="noopener noreferrer">
                  Ir a sitio oficial
                </a>
              </div>
              <div className="store-single-title-container">
                <FontAwesomeIcon
                  icon="user-md"
                  style={store.veterinary ? { color: '#ffa000' } : { color: '#ddd' }}
                />
                <span>{store.veterinary ? 'Veterinaria' : 'Sin servicio de Veterinaria'}</span>
              </div>
              <div className="store-single-title-container">
                <FontAwesomeIcon
                  icon="ambulance"
                  style={store.urgency ? { color: '#ffa000' } : { color: '#ddd' }}
                />
                <span>{store.urgency ? 'Urgencia' : 'Sin servicio de Urgencia'}</span>
              </div>
              <div className="store-single-title-container">
                <FontAwesomeIcon
                  icon="building"
                  style={store.physical_store ? { color: '#ffa000' } : { color: '#ddd' }}
                />
                <span>{store.physical_store ? 'Tienda Física' : 'Sin tienda física'}</span>
              </div>
              <div className="store-single-title-container">
                <FontAwesomeIcon
                  icon="car"
                  style={store.product_shipping ? { color: '#ffa000' } : { color: '#ddd' }}
                />
                <span>
                  {store.product_shipping ? 'Envío a domicilio' : 'Sin envío a domicilio'}
                </span>
              </div>
              <div className="store-single-title-container">
                <FontAwesomeIcon
                  icon="shower"
                  style={store.grooming ? { color: '#ffa000' } : { color: '#ddd' }}
                />
                <span>
                  {store.grooming ? 'Servicio de peluqueria' : 'Sin servicio de peluqueria'}
                </span>
              </div>
              <div
                id="phone-title"
                className="store-single-title-container-svg"
                onClick={this.toggleContent}
              >
                <FontAwesomeIcon icon="phone" />
                <span>Teléfono</span>
                <FontAwesomeIcon icon="angle-down" />
              </div>
              <div id="phone-content" className="store-single-content-container">
                {phone}
              </div>
              <div
                id="email-title"
                className="store-single-title-container-svg"
                onClick={this.toggleContent}
              >
                <FontAwesomeIcon icon="envelope" />
                <span>Email</span>
                <FontAwesomeIcon icon="angle-down" />
              </div>
              <div id="email-content" className="store-single-content-container">
                {email}
              </div>
              <div
                id="addresses-title"
                className="store-single-title-container-svg"
                onClick={this.toggleContent}
              >
                <FontAwesomeIcon icon="map-marker" />
                <span>Ubicación</span>
                <FontAwesomeIcon icon="angle-down" />
              </div>
              <div id="addresses-content" className="store-single-content-container">
                {addresses}
              </div>
              <div
                id="openhours-title"
                className="store-single-title-container-svg"
                onClick={this.toggleContent}
              >
                <FontAwesomeIcon icon="clock" />
                <span>Horarios</span>
                <FontAwesomeIcon icon="angle-down" />
              </div>
              <div id="openhours-content" className="store-single-content-container">
                {openHours}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

StorePage.propTypes = {
  getActiveRoute: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default StorePage

function parsePhoneNumber(number) {
  let newNumber = number.toString()
  if (newNumber.length === 11) {
    return (
      '+' +
      newNumber.slice(0, 2) +
      ' ' +
      newNumber.slice(2, 4) +
      ' ' +
      newNumber.slice(4, 8) +
      ' ' +
      newNumber.slice(8, 11)
    )
  } else if (newNumber.length === 9) {
    return (
      '+56 ' + newNumber.slice(0, 2) + ' ' + newNumber.slice(2, 6) + ' ' + newNumber.slice(6, 9)
    )
  } else {
    return newNumber
  }
}
