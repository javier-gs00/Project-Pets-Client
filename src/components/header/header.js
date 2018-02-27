import React from 'react';
import PropTypes from 'prop-types'
// import './header.css'

const Header = props => {
    let text = props.activeRoute.replace('/', '')
    // text = text.slice(0,1).toUpperCase() + text.slice(1)

    switch (text) {
        case 'productos':
            return <div className="header"><span>Productos</span></div>
        case 'categorias':
            return <div className="header"><span>Categorías</span></div>
        case 'tiendas':
            return <div className="header"><span>Tiendas</span></div>
        case 'menu':
            return <div className="header"><span>Menú</span></div>
        default:
            return <div className="header"><span>Project Pets</span></div>
    }
}

Header.propTypes = {
    activeRoute: PropTypes.string.isRequired
}

export default Header