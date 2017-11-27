import React, { Component } from 'react';
import './nav.css'

import NavSearchIcon from '../../assets/svg/nav.search.js';
import NavProductsIcon from '../../assets/svg/nav.products.js';
import NavStoresIcon from '../../assets/svg/nav.stores.js';
import NavLoginIcon from '../../assets/svg/nav.login.js';
import NavMenuIcon from '../../assets/svg/nav.menu.js';
import NavItem from '../../components/Nav/NavItem.js'

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            active: true
        }
    }

    handleClick = e => {
        // e.target.className = "active";
    }

    render() {
        return (
            <div className="navbar">
                <NavItem 
                    to={'/'}
                    className={"active"}
                    svg={<NavSearchIcon strokeWidth=".53"/>}
                    textDisplay={"Buscar"}
                    onClick={this.handleClick}/>
                <NavItem 
                    to={'/productos'}
                    className={""}
                    svg={<NavProductsIcon strokeWidth=".53"/>}
                    textDisplay={"Productos"}
                    onClick={this.handleClick}/>
                <NavItem 
                    to={'/tiendas'}
                    className={""}
                    svg={<NavStoresIcon strokeWidth=".53"/>}
                    textDisplay={"Tiendas"}
                    onClick={this.handleClick}/>
                <NavItem 
                    to={'/login'}
                    className={""}
                    svg={<NavLoginIcon strokeWidth=".53"/>}
                    textDisplay={"Ingresar"}
                    onClick={this.handleClick}/>
                <NavItem 
                    to={'/menu'}
                    className={""}
                    svg={<NavMenuIcon strokeWidth=".53"/>}
                    textDisplay={"Menú"}
                    onClick={this.handleClick}/>
            </div>
        );
    }
}

export default Nav