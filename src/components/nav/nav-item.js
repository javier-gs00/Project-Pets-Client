import React from 'react'
import { Link } from 'react-router-dom';

const NavItem = (props) => {
    return (
        <Link to={props.to} className={props.className} onClick={props.onClick}>
            <div className="navbar-link-container">
                {props.svg}
                <div className="navbar-text font-darkgrey font-bold font-large">{props.textDisplay}</div>
            </div>
        </Link>
    );
}

export default NavItem