import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class Menus extends Component {
    constructor() {
        super()
        this.state = {
            menus: [
                {
                    title: 'Sobre Project Pets',
                    paragraphs: [
                        'Projects Pets es un sitio web para ver productos para mascotas vendidos por las distintas veterinarias y tiendas de mascotas ubicadas en Chile en un solo lugar.',
                        'Además, aquí podrás encontrar toda la información relacionada a las tiendas que aparecen en este sitio, como sus sitios web, direcciones y teléfonos para que las puedas ubicar con facilidad.'
                    ]
                },
                {
                    title: 'Términos de uso',
                    paragraphs: [
                        'Este sitio web se encuentra en desarrollo, por lo que diseño y funcionalidad se encuentran en constante cambio',
                        'Además, no se garantiza que los datos presentados estén actualizados, por lo que no deben ser considerados como verídicos para la toma de decisiones.',
                    ]
                }              
            ]
        }
    }

    componentDidMount() {
        const { getActiveRoute } = this.props
        return getActiveRoute('/menu')
    }

    handleInputChange = e => this.setState({ searchValue: e.target.value })

    toggleContent = e => {
        const index = e.currentTarget.id
        const title = document.getElementsByClassName('menu-title-container')[index]
        const content = document.getElementsByClassName('menu-content-container')[index]
        if (content.style.maxHeight) {
            content.style.maxHeight = null
            content.style.borderTop = null
            title.classList.remove('rotated')
            title.classList.add('not-rotated')
        } else {
            content.style.maxHeight = content.scrollHeight + "px"
            content.style.borderTop = "1px solid #ddd"
            title.classList.remove('not-rotated')
            title.classList.add('rotated')
        }
    }

    render() {
        const { menus } = this.state
        const menuItems = menus.map((menu, index) => (
                <li className="li-menu" key={index}>
                    <div className="menu-title-container" id={index} onClick={this.toggleContent} >
                        { menu.title }
                        <FontAwesomeIcon icon="angle-down" />
                    </div>
                    <div className="menu-content-container" id={index} >
                        { menu.paragraphs.map((paragraph, index) => <p key={index}>{ paragraph }</p>) }
                    </div>
                </li>
            )
        )

        return (
            <div className="main">
                <div className="menu-container">
                    <ul className="ul-menu">
                        { menuItems }
                    </ul>
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