import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

// import NavSearchIcon from '../../assets/svg/nav.search.js';
// import NavProductsIcon from '../../assets/svg/nav.products.js'
// import NavStoresIcon from '../../assets/svg/nav.stores.js'
// import NavMenuIcon from '../../assets/svg/nav.menu.js'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const textColor = '#c7c7c7'
const normalColor = '#c67100'
const highlightColor = '#ffa000'

const NavItem = props => {
    const svgIcon = getSvgIcon({...props })

    return (
        <NavLink 
            to={props.route}>
            <div className="navbar-link-container">
                { svgIcon }
                <div className="navbar-text" style={props.routeMatch ? {color: normalColor} : {}}>{props.textDisplay}</div>
            </div>
        </NavLink>
    )
}

NavItem.propTypes = {
    route: PropTypes.string.isRequired,
    routeMatch: PropTypes.bool.isRequired,
    textDisplay: PropTypes.string.isRequired,
    stroke: PropTypes.bool.isRequired
}

export default NavItem

function getSvgIcon ({ svg, routeMatch, stroke }) {
    // const strokeWidth = ".53"

    switch (svg) {
        case 'productos':
            return <FontAwesomeIcon 
                icon="search"
                size="2x" 
                style={{
                    color: stroke ? highlightColor : textColor,
                    transform: stroke ? 'scale(1.15, 1.15)' : 'scale(1, 1)'}}/>
            // return <NavProductsIcon strokeWidth={strokeWidth} stroke={stroke ? normalColor : textColor} />
        case 'categorias':
            return <FontAwesomeIcon 
                icon="th-large"
                size="2x" 
                style={{
                    color: stroke ? highlightColor : textColor,
                    transform: stroke ? 'scale(1.15, 1.15)' : 'scale(1, 1)'}}/>
        case 'tiendas':
            return <FontAwesomeIcon
                icon="building"
                size="2x" 
                style={{
                    color: stroke ? highlightColor : textColor,
                    transform: stroke ? 'scale(1.15, 1.15)' : 'scale(1, 1)'}}/>
            // return <NavStoresIcon strokeWidth={strokeWidth} stroke={stroke ? normalColor : textColor} />
        case 'menu':
            return <FontAwesomeIcon
                icon="bars"
                size="2x" 
                style={{
                    color: stroke ? highlightColor : textColor,
                    transform: stroke ? 'scale(1.15, 1.15)' : 'scale(1, 1)'}}/>
            // return <NavMenuIcon strokeWidth={strokeWidth} stroke={stroke ? normalColor : textColor} />
        default:
            return false
    }
}