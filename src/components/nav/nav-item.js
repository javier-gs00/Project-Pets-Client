import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

// import NavSearchIcon from '../../assets/svg/nav.search.js';
import NavProductsIcon from '../../assets/svg/nav.products.js'
import NavStoresIcon from '../../assets/svg/nav.stores.js'
import NavMenuIcon from '../../assets/svg/nav.menu.js'

const textColor = '#464646'
const normalColor = '#c67100'
// const highlightColor = '#ffa000'

const NavItem = props => {
    const { route, routeMatch, stroke } = props
    const svgIcon = getSvgIcon(route, routeMatch, stroke)

    return (
        <NavLink 
            to={props.route}>
            <div className="navbar-link-container">
                { svgIcon }
                <div className="navbar-text font-darkgrey font-bold font-large" style={props.routeMatch ? {color: normalColor} : {}}>{props.textDisplay}</div>
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

function getSvgIcon (route, routeMatch, stroke) {
    const strokeWidth = ".53"

    switch (route) {
        case '/productos':
            return <NavProductsIcon strokeWidth={strokeWidth} stroke={stroke ? normalColor : textColor} />
        case '/tiendas':
            return <NavStoresIcon strokeWidth={strokeWidth} stroke={stroke ? normalColor : textColor} />
        case '/menu':
            return <NavMenuIcon strokeWidth={strokeWidth} stroke={stroke ? normalColor : textColor} />
        default:
            return false
    }
}