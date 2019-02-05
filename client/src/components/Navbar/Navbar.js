import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../pages/AuthService';
import "../pages/style.css";

class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }

    showNavigation = () => {
        if (this.Auth.loggedIn()) {
            return (
                <ul className="navbar-nav bg-white brand-h">
                    <li className="nav-item">
                        <Link className="nav-link nav-pages" to="/profile">PROFILE</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-pages" href="/message">MESSAGE</a>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link nav-pages" href="/" onClick={() => this.Auth.logout()}>LOGOUT</a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link nav-pages" href="/login">LOGIN</a>
                    </li>
                </ul>
            );
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg brand-h bg-white">
                <div className="container">
                    <Link className="navbar-brand brand-h" to="/">BeautyBuddy</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        {this.showNavigation()}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;