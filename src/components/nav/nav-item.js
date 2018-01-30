import React from 'react'
import { NavLink } from 'react-router-dom';

const NavItem = props => (
    <NavLink 
        to={props.to} >
        <div className="navbar-link-container">
            { props.svg }
            <div className="navbar-text font-darkgrey font-bold font-large" style={props.match ? {color: '#ffa000'} : {}}>{props.textDisplay}</div>
        </div>
    </NavLink>
)

export default NavItem