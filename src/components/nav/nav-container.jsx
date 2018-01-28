import React, { Component } from 'react';
import './nav.css'

// import NavSearchIcon from '../../assets/svg/nav.search.js';
import NavProductsIcon from '../../assets/svg/nav.products.js';
import NavStoresIcon from '../../assets/svg/nav.stores.js';
// import NavLoginIcon from '../../assets/svg/nav.login.js';
import NavMenuIcon from '../../assets/svg/nav.menu.js';
import NavItem from './nav-item'

// set the width of the svg
const strokeWidth = '.53'

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            links: [
                {
                    to: '/productos',
                    textDisplay: 'Productos',
                    svg: <NavProductsIcon strokeWidth={strokeWidth} />
                },{
                    to: '/tiendas',
                    textDisplay: 'Tiendas',
                    svg: <NavStoresIcon strokeWidth={strokeWidth} />
                },{
                    to: '/menu',
                    textDisplay: 'Menú',
                    svg: <NavMenuIcon strokeWidth={strokeWidth} />
                }
            ]
        }
    }

    render() {
        const links = this.state.links.map(link => (
            <NavItem 
                to={link.to}
                textDisplay={link.textDisplay}
                svg={link.svg}/>
        ))

        return (
            <div className="navbar bg-white">
                { links }
            </div>
        )
    }
}

export default Nav