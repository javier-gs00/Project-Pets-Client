import React from 'react'
import { Link } from 'react-router-dom';

const NavItem = (props) => {
    return (
        <Link to={props.to} exact activeClassName={props.className} onClick={props.onClick}>
            <div className="navbar-link-container">
                {props.svg}
                <div className="navbar-text navbar-text-active">{props.textDisplay}</div>
            </div>
        </Link>
    );
}

export default NavItem