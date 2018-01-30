import React from 'react'
import { NavLink } from 'react-router-dom'

// import NavSearchIcon from '../../assets/svg/nav.search.js';
import NavProductsIcon from '../../assets/svg/nav.products.js'
import NavStoresIcon from '../../assets/svg/nav.stores.js'
import NavMenuIcon from '../../assets/svg/nav.menu.js'

const color = '#c67100'
// const highlightColor = '#ffa000'

const NavItem = props => {
    const svgIcon = getSvgIcon(props.route, props.routeMatch, props.stroke)

    return (
        <NavLink 
            to={props.route}>
            <div 
                className="navbar-link-container">
                { svgIcon }
                <div className="navbar-text font-darkgrey font-bold font-large" style={props.routeMatch ? {color: color} : {}}>{props.textDisplay}</div>
            </div>
        </NavLink>
    )
}

export default NavItem

const strokeWidth = ".53"

function getSvgIcon (route, routeMatch, stroke) {
    switch (route) {
        case '/productos':
            return <NavProductsIcon strokeWidth={strokeWidth} stroke={stroke} />
        case '/tiendas':
            return <NavStoresIcon strokeWidth={strokeWidth} stroke={stroke}/>
        case '/menu':
            return <NavMenuIcon strokeWidth={strokeWidth} stroke={stroke}/>
        default:
            return false
    }
}