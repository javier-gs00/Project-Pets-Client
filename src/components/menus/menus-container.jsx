import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './menus.css'

class Menus extends Component {
    constructor() {
        super()
        this.state = {
            menus: [
                {
                    title: 'Sobre Project Pets',
                    paragraphs: [
                        'Projects Pets es un sitio web para comparar productos para mascotas vendidos por las distintas veterinarias y tiendas de mascotas ubicadas en Chile.',
                        'Aquí también podrás encontrar toda la información relacionada a las tiendas que registran productos en el sitio, como sus sitios web, direcciones y teléfonos para que las puedas ubicar con facilidad.'
                    ]
                },
                {
                    title: 'Términos de uso',
                    paragraphs: [
                        'Este sitio web se encuentra en desarrollo, por lo que los datos presentados no son verídicos.',
                        'El fin de este sitio web es solamente demostrativo.'
                    ]
                },
                {
                    title: 'Versión del sitio',
                    paragraphs: [
                        'El sitio web actualmente se encuentra en estado de desarrollo temprano. Razón por lo cual, su contenido, diseño y funcionalidad estarán en constante cambio.',
                    ]
                }                
            ]
        }
    }

    componentDidMount() {
        const { location } = this.props
        return this.props.getActiveRoute(location.pathname)
    }

    handleInputChange = e => this.setState({ searchValue: e.target.value })

    render() {
        const { menus } = this.state
        const menuItems = menus.map(menu => (
                <div className="menu-container">
                    <div className="menu">
                        <h2>{ menu.title }</h2>
                        { menu.paragraphs.map(paragraph => <p>{ paragraph }</p>) }
                    </div>
                </div>
            )
        )

        return (
            <div className="main">
                <div className="menus-container">
                    { menuItems }
                </div>
            </div>
        )
    }
}

Menus.propTypes = {
    getActiveRoute: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,   
}

export default Menus